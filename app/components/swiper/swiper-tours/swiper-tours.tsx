"use client";


import { TourType } from '@/types';
import { useEffect, useState } from 'react';
import Swiper_Tours_Mobile from './swiper-tours-mobile';
import Swiper_Tours_Desktop from './swiper-tours-desktop';


export default function Swiper_Tours({ tours, title = "", odd, className = "" }: { tours: TourType[], title?:string, odd?: boolean, className?:string; }) {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768); // define your mobile breakpoint here
    }

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) { return (<Swiper_Tours_Mobile tours={tours} title={title} odd={odd} className={className}/>);}
  else{ return (<Swiper_Tours_Desktop tours={tours} title={title} odd={odd} className={className}/>);}

}