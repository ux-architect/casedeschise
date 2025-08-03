'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';


function waitForImageLoad(img: HTMLImageElement): Promise<void> {
  return new Promise((resolve, reject) => {

    if (img.complete && img.naturalWidth !== 0) { 
      // Already loaded
      resolve();
    } else {
      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener('error', () => reject(new Error('Image failed to load')), { once: true });
    }
  });
}




export default function AddCityClassToBody() {
  const pathname = usePathname(); 

  useEffect(() => {
    
    const img = document.querySelector('img[data-wait-for-image]') as HTMLImageElement;
    
    // Determine the class based on pathname
    const city = pathname.split('/').find((segment) => ['sibiu', 'valcea'].includes(segment)) || null;
    const cssClass = city ? `city-is-${city}` : '';

    // Remove old classes before adding new one
    document.body.classList.remove('city-is-sibiu', 'city-is-valcea');

    waitForImageLoad(img).then(() => {
      document.body.classList.remove('still-loading');
      document.body.classList.add(cssClass);
    }).catch(() => {
      document.body.classList.remove('still-loading');
      document.body.classList.add(cssClass);
      console.warn('City image failed to load');
    });

    // Optional: Cleanup on unmount
    return () => {
      document.body.classList.remove('city-is-sibiu', 'city-is-valcea');
    };
  }, [pathname]);

  return null; // This component doesn't render anything visible
}