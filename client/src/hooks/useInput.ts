import { useState, ChangeEvent } from 'react';

export function useInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    onChange,
    setValue,
    reset,
  };
}
