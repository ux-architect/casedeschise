"use client";


import { ProjectType } from '@/types';
import { useEffect, useState } from 'react';
import Swiper_Projects_Mobile from './swiper-projects-mobile';
import Swiper_Projects_Desktop from './swiper-projects-desktop';


export default function Swiper_Projects({ projects, title = "", odd, className = "" }: { projects: ProjectType[], title?:string, odd?: boolean, className?:string; }) {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768); // define your mobile breakpoint here
    }

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) { return (<Swiper_Projects_Mobile projects={projects} title={title} odd={odd} className={className}></Swiper_Projects_Mobile>);}
  else{ return (<Swiper_Projects_Desktop projects={projects} title={title} odd={odd} className={className}/>);}

}