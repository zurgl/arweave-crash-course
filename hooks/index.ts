import {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import type { State } from 'context'
import { ArweaveContext } from 'context'
/*
function useLocalStorage(
  key: string,
  defaultValue: State
): [State, Dispatch<SetStateAction<State>>] {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key)

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue))
    }
  }, [key])

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
*/
const useLocalStorage = (key: string, initialValue: State) => {
  const [storedValue, setStoredValue] = useState<State>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value: State | ((val: State) => State)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

const useAppState = () => useContext(ArweaveContext)

export { useLocalStorage, useAppState }
