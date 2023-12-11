import { useLayoutEffect, useState } from 'react';

export function useScreenSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return { width, height };
}
