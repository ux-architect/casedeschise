"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './swiper-events-desktop.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { EventType, SiteInfoType } from '@/types';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalInfo } from '@/app/context/global-info-context';

export default function Swiper_Events_Desktop({ events, title = "", odd = false, className = "" }: { events: EventType[], title?:string, odd?: boolean, className?:string }) {

  const cssClass_odd = odd ? "odd-offset" : "";

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city :string = isSibiu ? "sibiu": "valcea";

  const generalInfo: SiteInfoType = useGlobalInfo();
  const year = generalInfo?.currentYear;

  let sliderDelay = generalInfo?.sliderInterval || 10000;
  if(process.env.NODE_ENV === 'development'){sliderDelay = 30000;}

  let sliderStartDelay = odd ? sliderDelay/2 : 0;
  sliderStartDelay += 1000 * Math.floor(Math.random() * 3);

  return (
    <Swiper className={`${styles['namespace-container']} swiper-responsive swiper-responsive-desktop ${className}`} modules={[Autoplay]} autoplay={{ delay: sliderDelay, disableOnInteraction: false }} loop={true} slidesPerView={2}
      // custom start of autoplay to have an offset on multiple swipers
      onInit={(swiper) => { if (swiper.autoplay) { swiper?.autoplay?.stop(); setTimeout(() => {swiper?.autoplay?.start();}, sliderStartDelay)}}}
      >
      {title && (<div className="swiper-title diff-sibiu-valcea">{title}</div>)}

      {events?.map((event, idx) => {

        const slug: string = event?.slug?.current ?? '';

        const parts = event?.name.split('///').map(p => p.trim()) || [];
        const title = parts[0];
        const subtitle = parts[1];

        const soldOut = event?.tags?.includes('soldOut') ? true : false;

        return(
          <SwiperSlide key={idx} className={cssClass_odd}>
              <Link className="col col-image" href={`/${city}/event/${slug}`} scroll={true} rel="noreferrer noopener">
                  <Image src={event?.profileImage1.image || "/public/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" alt={`${event.name} cover image`} fill />
              </Link>

              <div className="col col-description diff-sibiu-valcea diff-background" diff-background="">

                <h6 className='font-bold title font-safiro '>{title}</h6>
                <h6 className='font-regular subtitle '>{subtitle}</h6>
                {soldOut && ( <span className="sold-out-label diff-sibiu-valcea">LOCURI OCUPATE</span>)}

                <span className="description has-portable-text p-line-height-15 hide-long-text-9"><PortableText value={event?.description} /></span>

                <Link className="btn btn-black prevent-default-highlight" href={`/${city}/event/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
              </div>

              <div className="pin diff-sibiu-valcea "></div>

          </SwiperSlide>
        )})}
    </Swiper>
  );
}