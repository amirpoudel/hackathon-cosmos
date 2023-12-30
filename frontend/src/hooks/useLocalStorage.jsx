import { useState } from "react";

// Custom hook for storing and retrieving a value in localStorage
const useLocalStorage = (key, initialValue) => {
  // Use the key to get the initial value from localStorage or use the provided initialValue
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

  // State to hold the current value
  const [value, setValue] = useState(storedValue);

  // Function to update the value and store it in localStorage
  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
};

export default useLocalStorage;
