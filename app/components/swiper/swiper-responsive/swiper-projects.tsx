"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './swiper-projects.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { ProjectType, SiteInfoType } from '@/types';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalInfo } from '@/app/context/global-info-context';

export default function SwiperProjects({ projects, odd = false }: { projects: ProjectType[], odd?: boolean; }) {

  const cssClass_odd = odd ? "odd-offset" : "";

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city :string = isSibiu ? "sibiu": "valcea";

  const generalInfo: SiteInfoType = useGlobalInfo();
  const year = generalInfo?.currentYear;
  const sliderDelay = generalInfo?.sliderInterval || 10000;
  const sliderStartDelay = odd ? sliderDelay/2 : 0;

  return (
    <Swiper className={`${styles['swiper-projects']}`} modules={[Autoplay]} autoplay={{ delay: sliderDelay, disableOnInteraction: false }} loop={true} slidesPerView={2}
      // custom start of autoplay to have an offset on multiple swipers
      onInit={(swiper) => { if (swiper.autoplay) { swiper?.autoplay?.stop(); setTimeout(() => {swiper?.autoplay?.start();}, sliderStartDelay)}}}
      >
      
      {projects?.map((project, idx) => {

        const slug: string = project?.slug?.current ?? '';

        const parts = project?.name.split('///').map(p => p.trim()) || [];
        const title = parts[0];
        const subtitle = parts[1];

        return(
          <SwiperSlide key={idx} className={cssClass_odd}>
              <Link className="col col-image" href={`/${city}/${slug}`} scroll={true} rel="noreferrer noopener">
                  <Image src={project?.profileImage.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" alt={`${project.name} cover image`} fill />
              </Link>

              <div className="col col-description">

                <h6 className='font-bold title font-safiro diff-sibiu-valcea'>{title}</h6>
                <h6 className='font-regular subtitle diff-sibiu-valcea'>{subtitle}</h6>

                <span className="description has-portable-text hide-long-text-9"><PortableText value={project?.description} /></span>

                <Link className="btn btn-primary diff-sibiu-valcea" href={`/${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
              </div>

              <div className="pin diff-sibiu-valcea diff-background"></div>

          </SwiperSlide>
        )})}
    </Swiper>
  );
}