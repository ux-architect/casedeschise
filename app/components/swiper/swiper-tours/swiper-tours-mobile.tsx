import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper-tours-mobile.scss';
import Image from "next/image";
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { TourType, SiteInfoType } from '@/types';
import { PortableText } from 'next-sanity';
import { usePathname } from 'next/navigation';
import { useGlobalInfo } from '@/app/context/global-info-context';
import { Autoplay, Pagination } from 'swiper/modules';

export default function Swiper_Tours_Mobile({ title = "", odd = false, tours, className = "" }: { odd?: boolean, tours: TourType[], title?:string, className?:string }) {

  const generalInfo: SiteInfoType = useGlobalInfo();
  const year = generalInfo?.currentYear;

  let sliderDelay = generalInfo?.sliderInterval || 10000;
  if(process.env.NODE_ENV === 'development'){sliderDelay = 30000;}

  const sliderStartDelay = odd ? sliderDelay/2 : 0;

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city :string = isSibiu ? "sibiu": "valcea";

  
  return (

      <Swiper className={`nsc--swiper-tours-mobile swiper-responsive swiper-responsive-mobile ${className}`} modules={[Autoplay, Pagination]} autoplay={{ delay: sliderDelay, disableOnInteraction: false }} pagination={{ clickable: true }} loop={tours.length > 1} slidesPerView={1}
        // custom start of autoplay to have an offset on multiple swipers
        onInit={(swiper) => { if (swiper.autoplay) { swiper?.autoplay?.stop(); setTimeout(() => {swiper?.autoplay?.start();}, sliderStartDelay)}}}
        >
      
        {title && (<div className="swiper-title diff-sibiu-valcea diff-background">{title}</div>)}

        {tours?.map((tour, idx) => {
          
          const slug: string = tour?.slug?.current ?? '';

          const parts = tour?.name.split('///').map(p => p.trim()) || [];
          const title = parts[0];
          const subtitle = parts[1];

          const cssClass_descriptionLines = "hide-long-text-5";
          const soldOut = tour?.tags?.includes('soldOut') ? true : false;

          return(
            <SwiperSlide key={idx} className='clearfix'>
                
                  <>
                    <Link className="col col-image" href={`/${city}/tur/${slug}`} scroll={true} rel="noreferrer noopener">
                      <Image src={tour?.profileImage.image || "/public/should-not-happen.jpg"} className="object-cover"  loading="lazy" alt={`${tour.name} logo`} fill />
                    </Link>

                    <div className="col col-description diff-sibiu-valcea diff-background" diff-background="">
                      <h6 className='font-bold title font-safiro '>{title}</h6>
                      <h6 className='font-regular subtitle '>{subtitle}</h6>
                      {soldOut && ( <span className="sold-out-label diff-sibiu-valcea">LOCURI OCUPATE</span>)}

                      <span className={`${cssClass_descriptionLines} has-portable-text p-line-height-15`}><PortableText value={tour?.description} /></span>
                      <Link className="btn btn-black prevent-default-highlight" href={`/${city}/tur/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                    </div>
                    
                    <div className="pin"></div>

                  </>
                

            </SwiperSlide>)
          
        })}
      </Swiper>

  );
}