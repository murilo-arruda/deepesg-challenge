import * as React from 'react';
type cityProps = {
  wind: string;
  humidity: string;
  temp: string;
  name: string;
};
function useLocalStorageState(
  key: string,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = React.useState<cityProps[]>([]);
  React.useEffect(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      setState(deserialize(valueInLocalStorage));
    }
  }, []);

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState] as const;
}

export default useLocalStorageState;
