/**
 * History store — observable list of calculations.
 */

import type { HistoryEntry } from './types';
import { storage } from '../utils/storage';

type Listener = (history: HistoryEntry[]) => void;

const STORAGE_KEY = 'calc.history';
const MAX_ENTRIES = 200;

class HistoryStore {
  private entries: HistoryEntry[] = [];
  private listeners = new Set<Listener>();

  constructor() {
    this.load();
  }

  private async load() {
    const data = await storage.get(STORAGE_KEY);
    if (data && Array.isArray(data)) {
      this.entries = data as HistoryEntry[];
      this.emit();
    }
  }

  private save() {
    storage.set(STORAGE_KEY, this.entries).catch(() => {});
  }

  private emit() {
    for (const listener of this.listeners) listener([...this.entries]);
  }

  add(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): HistoryEntry {
    const full: HistoryEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    };
    this.entries.unshift(full);
    if (this.entries.length > MAX_ENTRIES) {
      this.entries.length = MAX_ENTRIES;
    }
    this.save();
    this.emit();
    return full;
  }

  clear(): void {
    this.entries = [];
    this.save();
    this.emit();
  }

  remove(id: string): void {
    this.entries = this.entries.filter((e) => e.id !== id);
    this.save();
    this.emit();
  }

  list(): HistoryEntry[] {
    return [...this.entries];
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener([...this.entries]);
    return () => this.listeners.delete(listener);
  }
}

export const history = new HistoryStore();
