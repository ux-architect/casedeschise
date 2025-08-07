'use client'
import { useEffect } from 'react';

const AddScrolledClassToBody = () => {
  useEffect(() => {
    const updateBodyClass = () => {
      // Skip if body is locked (e.g. mobile-nav is open)
      if (document.body.style.position === 'fixed') return;

      if (window.innerWidth <= 768) {
        const scrollElem = document.scrollingElement ?? document.documentElement;
        const isScrolled = scrollElem.scrollTop > 10;
        document.body.classList.toggle('is-scrolled', isScrolled);
      } else {
        document.body.classList.remove('is-scrolled');
      }
    };

    updateBodyClass();
    window.addEventListener('scroll', updateBodyClass);

    return () => {
      window.removeEventListener('scroll', updateBodyClass);
    };
  }, []);

  return null;
};
export default AddScrolledClassToBody;