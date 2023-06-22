import React from 'react';

const useScrollLock = () => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
};

export default useScrollLock;
