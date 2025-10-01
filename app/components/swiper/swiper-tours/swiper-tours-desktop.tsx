"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './swiper-tours-desktop.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { TourType, SiteInfoType } from '@/types';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalInfo } from '@/app/context/global-info-context';


// !!! not actually swiper - on desktop
export default function Swiper_Tours_Desktop({ tours, title = "", odd = false, className = "" }: { tours: TourType[], title?:string, odd?: boolean, className?:string }) {

  const cssClass_odd = odd ? "odd-offset" : "";

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city :string = isSibiu ? "sibiu": "valcea";

  return (
    <div className={`${styles['namespace-container']} swiper-responsive swiper-responsive-desktop ${className}`}
      >
      {title && (<div className="swiper-title diff-sibiu-valcea diff-background">{title}</div>)}

      {tours?.map((tour, idx) => {

        const slug: string = tour?.slug?.current ?? '';

        const parts = tour?.name.split('///').map(p => p.trim()) || [];
        const title = parts[0];
        const subtitle = parts[1];

        const cssClass_oddTour = (idx % 2 === 0) ? "": "odd-offset";

        return(
          <div key={idx} className={`swiper-slide ${cssClass_oddTour}`}>
              <Link className="col col-image" href={`/${city}/tur/${slug}`} scroll={true} rel="noreferrer noopener">
                  <Image src={tour?.profileImage.image || "/public/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" alt={`${tour.name} cover image`} fill />
              </Link>

              <div className="col col-description">

                <h6 className='font-bold title font-safiro '>{title}</h6>
                <h6 className='font-regular subtitle '>{subtitle}</h6>

                <span className="description has-portable-text hide-long-text-9"><PortableText value={tour?.description} /></span>

                <Link className="btn btn-black prevent-default-highlight" href={`/${city}/tur/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
              </div>

              <div className="pin"></div>

          </div>
        )})}
    </div>
  );
}