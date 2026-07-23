function createStorage(getStore: () => Storage) {
  return {
    get: <T>(key: string, defaultValue?: T): T | null => {
      try {
        const item = getStore().getItem(key);
        return item ? JSON.parse(item) : (defaultValue ?? null);
      } catch {
        return defaultValue ?? null;
      }
    },

    set: <T>(key: string, value: T): void => {
      try {
        getStore().setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn("Failed to save to storage:", error);
      }
    },

    remove: (key: string): void => {
      try {
        getStore().removeItem(key);
      } catch (error) {
        console.warn("Failed to remove from storage:", error);
      }
    },

    clear: (): void => {
      try {
        getStore().clear();
      } catch (error) {
        console.warn("Failed to clear storage:", error);
      }
    },
  };
}

export const LocalStorage = createStorage(() => localStorage);
export const SessionStorage = createStorage(() => sessionStorage);
