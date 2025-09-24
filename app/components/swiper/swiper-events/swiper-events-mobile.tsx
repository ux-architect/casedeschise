import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './swiper-events-mobile.module.scss';
import Image from "next/image";
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { EventType, SiteInfoType } from '@/types';
import { PortableText } from 'next-sanity';
import { usePathname } from 'next/navigation';
import { useGlobalInfo } from '@/app/context/global-info-context';
import { Autoplay, Pagination } from 'swiper/modules';

export default function Swiper_Events_Mobile({ title = "", odd = false, events, className = "" }: { odd?: boolean, events: EventType[], title?:string, className?:string }) {

  const generalInfo: SiteInfoType = useGlobalInfo();
  const year = generalInfo?.currentYear;
  const sliderDelay = generalInfo?.sliderInterval || 10000;
  const sliderStartDelay = odd ? sliderDelay/2 : 0;

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city :string = isSibiu ? "sibiu": "valcea";

  
  return (

      <Swiper className={`${styles['namespace-container']} swiper-responsive swiper-responsive-mobile ${className}`} modules={[Autoplay, Pagination]} autoplay={{ delay: sliderDelay, disableOnInteraction: false }} pagination={{ clickable: true }} loop={true} slidesPerView={1}
        // custom start of autoplay to have an offset on multiple swipers
        onInit={(swiper) => { if (swiper.autoplay) { swiper?.autoplay?.stop(); setTimeout(() => {swiper?.autoplay?.start();}, sliderStartDelay)}}}
        >
      
        {title && (<div className="swiper-title diff-sibiu-valcea">{title}</div>)}

        {events?.map((event, idx) => {
          
          const slug: string = event?.slug?.current ?? '';

          const parts = event?.name.split('///').map(p => p.trim()) || [];
          const title = parts[0];
          const subtitle = parts[1];

          const cssClass_descriptionLines = subtitle ? "hide-long-text-5": "hide-long-text-6";

          return(
            <SwiperSlide key={idx} className='clearfix'>
                
                  <>
                    <Link className="col col-image" href={`/${city}/event/${slug}`} scroll={true} rel="noreferrer noopener">
                      <Image src={event?.profileImage1.image || "/public/should-not-happen.jpg"} className="object-cover"  loading="lazy" alt={`${event.name} logo`} fill />
                    </Link>

                    <div className="col col-description diff-sibiu-valcea diff-background" diff-background="">
                      <h6 className='font-bold title font-safiro '>{title}</h6>
                      <h6 className='font-regular subtitle '>{subtitle}</h6>

                      <span className={`${cssClass_descriptionLines} has-portable-text`}><PortableText value={event?.description} /></span>
                      <Link className="btn btn-black prevent-default-highlight" href={`/${city}/event/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                    </div>
                    
                    <div className="pin"></div>

                  </>
                

            </SwiperSlide>)
          
        })}
      </Swiper>

  );
}