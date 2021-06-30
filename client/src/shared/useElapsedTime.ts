/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect, useState } from 'react';

type ReturnType = [number, () => void];

function useElapsedTime(startTime: number): ReturnType {
  const [start, setStart] = useState(startTime);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setElapsedTime(elapsed);
    }, 50);
    return () => {
      clearInterval(id);
    };
  }, []);

  function reset() {
    setStart(Date.now());
  }

  return [elapsedTime, reset];
}

export default useElapsedTime;
