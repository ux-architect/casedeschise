"use client";


import { EventType } from '@/types';
import { useEffect, useState } from 'react';
import Swiper_Events_Mobile from './swiper-events-mobile';
import Swiper_Events_Desktop from './swiper-events-desktop';


export default function Swiper_Events({ events, title = "", odd, className = "" }: { events: EventType[], title?:string, odd?: boolean, className?:string; }) {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768); // define your mobile breakpoint here
    }

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) { return (<Swiper_Events_Mobile events={events} title={title} odd={odd} className={className}></Swiper_Events_Mobile>);}
  else{ return (<Swiper_Events_Desktop events={events} title={title} odd={odd} className={className}/>);}

}