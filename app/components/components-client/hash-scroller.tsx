'use client';

import { useEffect } from 'react';

export default function HashScroller() {
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the #
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        // Small delay to ensure layout is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 700);
      }
    }
  }, []);

  return null;
}
