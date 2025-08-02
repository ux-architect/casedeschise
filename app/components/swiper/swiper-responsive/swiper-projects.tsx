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

export default function SwiperProjects({ projects, odd }: { projects: ProjectType[], odd?: boolean; }) {

  const cssClass_odd = odd ? "odd-offset" : "";

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city :string = isSibiu ? "sibiu": "valcea";

  const generalInfo: SiteInfoType = useGlobalInfo();
  const year = generalInfo?.currentYear;
  

  return (
    <Swiper className={`${styles['swiper-projects']}`} modules={[Autoplay]} autoplay={{ delay: 26500, disableOnInteraction: false }} loop={true} slidesPerView={2}>
      {projects?.map((project, idx) => {

        const slug: string = project?.slug?.current ?? '';
        return(
          <SwiperSlide key={idx} className={cssClass_odd}>
              <Link className="col col-image" href={`/${year}/${city}/${slug}`} scroll={true} rel="noreferrer noopener">
                  <Image src={project?.profileImage.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" alt={`${project.name} logo`} fill />
              </Link>

              <div className="col col-description">
                <h6 className='font-bold diff-sibiu-valcea'>{project?.name}</h6>
                <span className="hide-long-text-9"><PortableText value={project?.description} /></span>

                <Link className="btn btn-primary diff-sibiu-valcea" href={`/${year}/${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
              </div>

              <div className="pin diff-sibiu-valcea diff-background"></div>

          </SwiperSlide>
        )})}
    </Swiper>
  );
}