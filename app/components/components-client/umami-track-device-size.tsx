'use client';

import { useEffect } from 'react';

// Declare umami globally if needed
 declare const umami: ((event: string) => void) | undefined;

export const UmamiTrackDeviceSize: React.FC = () => {

  const getDeviceInterval = (width: number): string => {
    // Phones
    if (width <= 320) return 'Phone XS';
    if (width <= 360) return 'Phone S';
    if (width <= 375) return 'Phone M';
    if (width <= 425) return 'Phone L';
    if (width <= 500) return 'Phone XL';
    if (width <= 600) return 'Phone XXL';

    // Tablets
    if (width <= 700) return 'Tablet XS';
    if (width <= 768) return 'Tablet S';
    if (width <= 834) return 'Tablet M';
    if (width <= 900) return 'Tablet L';
    if (width <= 1024) return 'Tablet XL';

    // Screens / Desktops
    if (width <= 1280) return 'Screen XS';
    if (width <= 1440) return 'Screen S';
    if (width <= 1600) return 'Screen M';
    if (width <= 1920) return 'Screen L';
    if (width <= 2560) return 'Screen XL';
    return 'Screen XXL'; // Larger than 2560px (ultra-wide / 5K / 8K screens)
  };

 useEffect(() => {
  if (typeof window !== 'undefined' && !sessionStorage.getItem('deviceWidthTracked')) {
    // Wait 20 seconds before tracking
    const timer = setTimeout(() => {
      const screenWidth = window.innerWidth;
      const deviceInterval = getDeviceInterval(screenWidth);

      if ((window as any).umami) {
        (window as any).umami.track(`Device: ${deviceInterval}`);
      }

      sessionStorage.setItem('deviceWidthTracked', 'true');
    }, 20000); // 20000ms = 20 seconds

    // Cleanup in case component unmounts before 20s
    return () => clearTimeout(timer);
  }
}, []);

  return null;
};