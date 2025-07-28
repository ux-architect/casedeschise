import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './mobile-non-swiper-projects.module.scss';

import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { ProjectType } from '@/types';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNonSwiperProjects({ projects }: { projects: ProjectType[] }) {

  const pathname = usePathname()
  const isSibiu = pathname === '/sibiu' || pathname.startsWith('/sibiu/')
  const isValcea = pathname === '/valcea' || pathname.startsWith('/valcea/')
  const city :string = isSibiu ? "sibiu": "valcea";

  return (
    <section className={`${styles['mobile-non-swiper-projects']} clearfix`}>
      {projects?.map((project, idx) => {
        
        const slug: string = project?.slug?.current ?? '';
        return(
          <SwiperSlide key={idx}>
              
                <Link className="col col-image" href={`${city}/${slug}`} scroll={true} rel="noreferrer noopener">
                  {/* <Image src={project?.images?.[0]?.image || "/should-not-happen.jpg"} className="object-cover" alt={`${project.name} logo`} fill /> */}
                  <Image src={project?.profileImage.image || "/should-not-happen.jpg"} className="object-cover" alt={`${project.name} logo`} fill />
                </Link>

                <div className="col col-description">
                  <h6 className='font-bold'>{project?.name}</h6>
                  <span className='hide-long-text-6'><PortableText value={project?.description} /></span>
                  <Link className="btn btn-primary" href={`${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                </div>
                
                
                <div className="pin"></div>

          </SwiperSlide>)
        
      })}
  </section>
  );
}