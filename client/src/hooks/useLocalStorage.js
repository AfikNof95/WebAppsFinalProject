import { useCallback, useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : [];
  });
  const clearValue = useCallback(() => {
    setValue([]);
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue, clearValue];
};

export default useLocalStorage;
