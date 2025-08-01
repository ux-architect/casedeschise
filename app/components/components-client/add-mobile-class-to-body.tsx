'use client';

import { useEffect } from 'react';

export default function AddMobileClassToBody() {
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobile = window.innerWidth <= 768;
      document.body.classList.toggle('is-mobile', isMobile);
    };

    checkIsMobile(); // Check on mount

    window.addEventListener('resize', checkIsMobile); // Check on resize

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      document.body.classList.remove('is-mobile');
    };
  }, []);

  return null;
}