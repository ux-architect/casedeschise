"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './swiper-projects.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { ProjectType } from '@/types';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

export default function SwiperProjects({ projects, odd }: { projects: ProjectType[], odd?: boolean; }) {

  const cssClass_odd = odd ? "odd-offset" : "";
  return (
    <Swiper className={`${styles['swiper-projects']}`} modules={[Autoplay]} autoplay={{ delay: 26500, disableOnInteraction: false }} loop={true} slidesPerView={2}>
      {projects?.map((project, idx) => (
        <SwiperSlide key={idx} className={cssClass_odd}>
            <Link className="col col-image" href={project.slug.current} scroll={false} rel="noreferrer noopener">
                {/* <Image src={project?.images?.[0]?.image || "/should-not-happen.jpg"} className="object-cover" alt={`${project.name} logo`} fill /> */}
                <Image src={project?.profileImage.image || "/should-not-happen.jpg"} className="object-cover" alt={`${project.name} logo`} fill />
            </Link>

            <div className="col col-description">
              <h6 className='font-bold'>{project?.name}</h6>
              <span className="hide-long-text-9"><PortableText value={project?.description} /></span>

              <Link className="btn btn-primary" href={project.slug.current} scroll={false} rel="noreferrer noopener">VEZI MAI MULT</Link>
            </div>

            <div className="pin"></div>

        </SwiperSlide>
      ))}
    </Swiper>
  );
}