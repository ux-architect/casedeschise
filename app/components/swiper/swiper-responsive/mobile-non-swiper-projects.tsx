import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './mobile-non-swiper-projects.module.scss';
import Image from "next/image";
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { ProjectType, SiteInfoType } from '@/types';
import { PortableText } from 'next-sanity';
import { usePathname } from 'next/navigation';
import { useGlobalInfo } from '@/app/context/global-info-context';
import { Autoplay } from 'swiper/modules';

export default function MobileNonSwiperProjects({ projects }: { projects: ProjectType[] }) {

  const generalInfo: SiteInfoType = useGlobalInfo();
  const year = generalInfo?.currentYear;
  

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city :string = isSibiu ? "sibiu": "valcea";

  return (
    <section className={`${styles['mobile-non-swiper-projects']} clearfix`}>

      <Swiper className={`${styles['swiper-projects']}`} modules={[Autoplay]} autoplay={{ delay: 26500, disableOnInteraction: false }} loop={true} slidesPerView={1}>
        {projects?.map((project, idx) => {
          
          const slug: string = project?.slug?.current ?? '';
          const isEvenSlide = idx % 2 === 0;
          const isOddSlide = idx % 2 === 1;
          return(
            <SwiperSlide key={idx} className='clearfix'>
                {isEvenSlide && (
                  <>
                    <Link className="col col-image" href={`/${year}/${city}/${slug}`} scroll={true} rel="noreferrer noopener">
                      <Image src={project?.profileImage.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" alt={`${project.name} logo`} fill />
                    </Link>

                    <div className="col col-description">
                      <h6 className='font-bold hide-long-text'>{project?.name}</h6>
                      <span className='hide-long-text-6'><PortableText value={project?.description} /></span>
                      <Link className="btn btn-primary" href={`/${year}/${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                    </div>
                    
                    <div className="pin"></div>

                  </>)}
                {isOddSlide && (
                  <>
                    <Link className="col col-image" href={`/${year}/${city}/${slug}`} scroll={true} rel="noreferrer noopener">
                      <Image src={project?.profileImage.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" alt={`${project.name} logo`} fill />
                    </Link>

                    <div className="col col-description">
                      <h6 className='font-bold hide-long-text'>{project?.name}</h6>
                      <span className='hide-long-text-6'><PortableText value={project?.description} /></span>
                      <Link className="btn btn-primary" href={`/${year}/${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                    </div>
                    
                    
                    <div className="pin"></div>
                  </>)}


            </SwiperSlide>)
          
        })}
      </Swiper>
  </section>
  );
}