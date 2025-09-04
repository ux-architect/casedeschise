"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './swiper-images.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { SiteInfoType } from '@/types';
import { useGlobalInfo } from '@/app/context/global-info-context';

export default function SwiperComponent({ images, projectName }: { images: { image: string }[]; projectName: string }) {
  
  const generalInfo: SiteInfoType = useGlobalInfo();
  const sliderDelay = generalInfo?.sliderInterval || 10000;

  return (
    <Swiper
      className={`${styles['swiper-images']}`}
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