import { useState, useEffect, Dispatch, SetStateAction } from "react";

type IStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

function useStateStorage<T>(initialValue: T, key: string): IStateReturnType<T> {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useStateStorage;
