import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, string | null] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [status, setStatus] = useState<string | null>(null);

  // Initialize from local storage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
        setStatus('restored');
      }
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  // Clear status after 2 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      setStatus('saved');
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, status];
}
