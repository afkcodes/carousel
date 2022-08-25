import { useEffect, useState } from 'react';

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });
  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowSize({ height: window.innerHeight, width: window.innerWidth });
      window.addEventListener('resize', () => {
        console.log('window size updated');
        setWindowSize({ height: window.innerHeight, width: window.innerWidth });
      });
    }
    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener('resize', () => {
          console.log('removed window resize listener');
        });
      }
    };
  }, []);
  return windowSize;
};

export default useWindowResize;
