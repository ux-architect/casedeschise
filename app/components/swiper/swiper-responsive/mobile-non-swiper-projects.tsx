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
import { Autoplay, Pagination } from 'swiper/modules';

export default function MobileNonSwiperProjects({ odd = false, projects }: { odd?: boolean, projects: ProjectType[] }) {

  const generalInfo: SiteInfoType = useGlobalInfo();
  const year = generalInfo?.currentYear;
  const sliderDelay = generalInfo?.sliderInterval || 10000;
  const sliderStartDelay = odd ? sliderDelay/2 : 0;

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city :string = isSibiu ? "sibiu": "valcea";

  
  return (
    <section className={`${styles['mobile-non-swiper-projects']} clearfix`}>

      <Swiper className={`${styles['swiper-projects']}`} modules={[Autoplay, Pagination]} autoplay={{ delay: sliderDelay, disableOnInteraction: false }} pagination={{ clickable: true }} loop={true} slidesPerView={1}
        // custom start of autoplay to have an offset on multiple swipers
        onSwiper={(swiper) => { swiper.autoplay.stop(); setTimeout(() => {swiper.autoplay.start();}, sliderStartDelay)}}>
      
        
        {projects?.map((project, idx) => {
          
          const slug: string = project?.slug?.current ?? '';

          const parts = project?.name.split('///').map(p => p.trim()) || [];
          const title = parts[0];
          const subtitle = parts[1];

          const cssClass_descriptionLines = subtitle ? "hide-long-text-5": "hide-long-text-6";

          return(
            <SwiperSlide key={idx} className='clearfix'>
                
                  <>
                    <Link className="col col-image" href={`/${city}/${slug}`} scroll={true} rel="noreferrer noopener">
                      <Image src={project?.profileImage.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" alt={`${project.name} logo`} fill />
                    </Link>

                    <div className="col col-description">
                      <h6 className='font-bold title font-safiro diff-sibiu-valcea'>{title}</h6>
                      <h6 className='font-regular subtitle diff-sibiu-valcea'>{subtitle}</h6>

                      <span className={cssClass_descriptionLines}><PortableText value={project?.description} /></span>
                      <Link className="btn btn-primary diff-sibiu-valcea" href={`/${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                    </div>
                    
                    <div className="pin"></div>

                  </>
                

            </SwiperSlide>)
          
        })}
      </Swiper>
  </section>
  );
}