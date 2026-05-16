/**
 * Plugin manager.
 *
 * Loads ES modules from the `plugins/` directory at runtime.
 *
 * In dev mode (Vite): uses import.meta.glob to discover plugins.
 * In production: same — Vite bakes the glob into a static map.
 *
 * For Tauri Mobile: plugins can be loaded from filesystem at runtime via
 * Tauri's fs API and `new Function(code)` (sandboxed).
 *
 * Each plugin exports a default object matching the `Plugin` type.
 */

import type { Plugin, Formula } from '../core/types';
import { register as registerFormula } from '../core/formulas/registry';

type Listener = (plugins: Plugin[]) => void;

class PluginManager {
  private plugins = new Map<string, Plugin>();
  private listeners = new Set<Listener>();

  async loadBuiltins(): Promise<void> {
    // Vite syntax — at build time this becomes a static map of all matching files.
    const modules = import.meta.glob('/plugins/*.js', { eager: false });

    for (const [path, loader] of Object.entries(modules)) {
      try {
        const mod = (await loader()) as { default: Plugin };
        if (mod.default) {
          this.install(mod.default);
        }
      } catch (err) {
        console.warn(`[plugins] failed to load ${path}`, err);
      }
    }
  }

  install(plugin: Plugin): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`[plugins] duplicate plugin id: ${plugin.id}`);
      return;
    }
    this.plugins.set(plugin.id, plugin);

    // Auto-register formulas exposed by the plugin
    if (plugin.formulas) {
      for (const f of plugin.formulas) {
        registerFormula(f);
      }
    }

    this.emit();
  }

  uninstall(id: string): void {
    this.plugins.delete(id);
    this.emit();
  }

  list(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  /** Install a plugin from raw JS source code (e.g. user-pasted). */
  async installFromSource(source: string): Promise<void> {
    // Create a blob URL and dynamic-import it
    const blob = new Blob([source], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    try {
      const mod = (await import(/* @vite-ignore */ url)) as { default: Plugin };
      if (mod.default) this.install(mod.default);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener([...this.plugins.values()]);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    for (const listener of this.listeners) listener([...this.plugins.values()]);
  }
}

export const plugins = new PluginManager();

/** Helper for plugin authors — re-exported so plugins can import { defineFormula } from '@plugins' */
export function defineFormula(formula: Formula): Formula {
  return formula;
}
