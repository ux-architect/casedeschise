'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AddCityClassToBody() {
  const pathname = usePathname();

  useEffect(() => {
    // Determine the class based on pathname
    const cssClass = pathname.startsWith('/sibiu')? 'city-is-sibiu': pathname.startsWith('/valcea')? 'city-is-valcea': '';

    // Remove old classes before adding new one
    document.body.classList.remove('city-is-sibiu', 'city-is-valcea');

    if (cssClass) { document.body.classList.add(cssClass);}

    // Optional: Cleanup on unmount
    return () => {
      document.body.classList.remove('city-is-sibiu', 'city-is-valcea');
    };
  }, [pathname]);

  return null; // This component doesn't render anything visible
}