import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setScreenSize(() => {
        if (screenWidth < 600) {
          return 'xs';
        } else if (screenWidth < 900) {
          return 'sm';
        } else if (screenWidth < 1200) {
          return 'md';
        } else if (screenWidth < 1536) {
          return 'xl';
        }
        return 'xl';
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [screenSize, setScreenSize];
};

export default useScreenSize;
