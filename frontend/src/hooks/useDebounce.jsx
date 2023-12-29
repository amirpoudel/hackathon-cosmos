//what it does is that it delays the execution of the function that is passed to it by the delay time

import { useEffect, useState } from "react";
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, [delay]);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
