import { useState, useEffect } from "react";

/**
 * Custom hook to debounce any value by a specified delay (default 300ms).
 *
 * @param {*} value The value to debounce
 * @param {number} delay Delay in milliseconds (default: 300)
 * @returns {*} The debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
