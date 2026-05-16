/**
 * Storage abstraction.
 * Web/PWA → localStorage. Tauri → can be swapped to fs without touching consumers.
 */

interface StorageBackend {
  get<T = unknown>(key: string): Promise<T | null>;
  set(key: string, value: unknown): Promise<void>;
  remove(key: string): Promise<void>;
}

class LocalStorageBackend implements StorageBackend {
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  async set(key: string, value: unknown): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('[storage] write failed', err);
    }
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

class MemoryBackend implements StorageBackend {
  private map = new Map<string, unknown>();
  async get<T>(key: string): Promise<T | null> {
    return (this.map.get(key) as T) ?? null;
  }
  async set(key: string, value: unknown): Promise<void> {
    this.map.set(key, value);
  }
  async remove(key: string): Promise<void> {
    this.map.delete(key);
  }
}

function selectBackend(): StorageBackend {
  if (typeof window !== 'undefined' && 'localStorage' in window) {
    return new LocalStorageBackend();
  }
  return new MemoryBackend();
}

export const storage: StorageBackend = selectBackend();
