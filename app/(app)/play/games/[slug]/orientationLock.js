import { useEffect } from 'react';

export default function useOrientationLock() {
  useEffect(() => {
    const lockOrientation = () => {
      try {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('portrait');
        }
      } catch (error) {
        console.error('Error locking orientation:', error);
      }
    };

    lockOrientation();

    // Clean up function to unlock orientation when component unmounts
    return () => {
      try {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      } catch (error) {
        console.error('Error unlocking orientation:', error);
      }
    };
  }, []);
}