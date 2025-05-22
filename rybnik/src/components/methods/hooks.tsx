import { useState, useEffect } from 'react';

type UseLocalStorageOptions<T> = {
  validator?: (value: unknown) => boolean;
  onError?: (error: Error) => void;
  initialValue?: T;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions<T>
): [T, (value: T | ((val: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = typeof window !== 'undefined' 
        ? localStorage.getItem(key) 
        : null;
      
      if (storedValue === null) return initialValue;

      const parsed = JSON.parse(storedValue);
      
      if (options?.validator && !options.validator(parsed)) {
        throw new Error('Validation failed');
      }

      return parsed;
    } catch (error) {
      options?.onError?.(error as Error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      options?.onError?.(error as Error);
    }
  }, [key, value]);

  return [value, setValue];
}