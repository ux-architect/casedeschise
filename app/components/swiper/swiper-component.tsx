"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './swiper-component.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { SiteInfoType } from '@/types';
import { getGeneralInfo } from '@/sanity/sanity.query';

export default async function SwiperComponent({ images, projectName }: { images: { image: string }[]; projectName: string }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
  const sliderDelay = generalInfo?.sliderInterval || 10000;

  return (
    <Swiper
      className={`${styles['swiper-component']}`}
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: sliderDelay, disableOnInteraction: false }}
      loop={true}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {images?.map((src, idx) => (
        <SwiperSlide key={idx}>
          <Image src={src.image} className="object-cover" alt={`${projectName} logo`} fill />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}