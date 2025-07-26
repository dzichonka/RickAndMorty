import { useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;

      if (typeof defaultValue === 'string') {
        return item as unknown as T;
      }

      return JSON.parse(item);
    } catch (error) {
      console.warn(`Could not read localStorage key “${key}”:`, error);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;

      setValue(valueToStore);

      if (typeof valueToStore === 'string') {
        localStorage.setItem(key, valueToStore);
      } else {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Could not set localStorage key “${key}”:`, error);
    }
  };

  return [value, setStoredValue] as const;
}
