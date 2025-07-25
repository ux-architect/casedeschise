"use client";


import { ProjectType } from '@/types';
import { useEffect, useState } from 'react';
import MobileNonSwiperProjects from './mobile-non-swiper-projects';
import SwiperProjects from './swiper-projects';


export default function SwiperResponsive({ projects, odd }: { projects: ProjectType[], odd?: boolean; }) {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768); // define your mobile breakpoint here
    }

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) { return (<MobileNonSwiperProjects projects={projects}></MobileNonSwiperProjects>);}
  else{ return (<SwiperProjects projects={projects} odd={odd}/>);}

}