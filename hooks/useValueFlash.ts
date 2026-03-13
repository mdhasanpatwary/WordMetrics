import { useState, useEffect, useRef } from 'react';

/**
 * A hook that returns a boolean that is true for a brief moment
 * whenever the provided value changes.
 */
export function useValueFlash(value: any, duration = 150): boolean {
  const [isFlashing, setIsFlashing] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setIsFlashing(true);
    const timer = setTimeout(() => setIsFlashing(false), duration);

    return () => clearTimeout(timer);
  }, [value, duration]);

  return isFlashing;
}
