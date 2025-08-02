import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './mobile-non-swiper-projects.module.scss';
import Image from "next/image";
import Link from 'next/link';
import { SwiperSlide } from "swiper/react";
import { ProjectType, SiteInfoType } from '@/types';
import { PortableText } from 'next-sanity';
import { usePathname } from 'next/navigation';
import { useGlobalInfo } from '@/app/context/global-info-context';

export default function MobileNonSwiperProjects({ projects }: { projects: ProjectType[] }) {

  const generalInfo: SiteInfoType = useGlobalInfo();
  const year = generalInfo?.currentYear;
  

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city :string = isSibiu ? "sibiu": "valcea";

  return (
    <section className={`${styles['mobile-non-swiper-projects']} clearfix`}>
      {projects?.map((project, idx) => {
        
        const slug: string = project?.slug?.current ?? '';
        return(
          <SwiperSlide key={idx}>
              
                <Link className="col col-image" href={`/${year}/${city}/${slug}`} scroll={true} rel="noreferrer noopener">
                  {/* <Image src={project?.images?.[0]?.image || "/should-not-happen.jpg"} className="object-cover" alt={`${project.name} logo`} fill /> */}
                  <Image src={project?.profileImage.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" alt={`${project.name} logo`} fill />
                </Link>

                <div className="col col-description">
                  <h6 className='font-bold'>{project?.name}</h6>
                  <span className='hide-long-text-6'><PortableText value={project?.description} /></span>
                  <Link className="btn btn-primary" href={`/${year}/${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                </div>
                
                
                <div className="pin"></div>

          </SwiperSlide>)
        
      })}
  </section>
  );
}