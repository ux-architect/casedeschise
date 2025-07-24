"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './swiper-component.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

export default function SwiperComponent({ images, projectName }: { images: string[]; projectName: string }) {
  return (
    <Swiper
      className={`${styles['swiper-component']}`}
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 26500, disableOnInteraction: false }}
      loop={true}
      slidesPerView={1}
      pagination={true}
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <Image src={src} className="object-cover" alt={`${projectName} logo`} fill />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}