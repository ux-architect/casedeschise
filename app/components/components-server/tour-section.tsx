import styles from './tour-section.module.scss';
import { SiteInfoType, TourType } from "@/types";
import Image from "next/image";
import { PortableText } from 'next-sanity';

import Link from 'next/link';
import { getGeneralInfo } from '@/sanity/sanity.query';


export default async function ToursSection({ className = '', id = '', tours, page }: { className?: string, id?: string, tours: TourType[], page: string }) {


  const generalInfo: SiteInfoType = await getGeneralInfo();
  const visitFormExternalUrl = generalInfo?.externalFormLinks_sibiu?.visitFormExternalUrl || "#";

  const city :string = page == "sibiu" ? "sibiu": "valcea";
  const linkPrefix = "/" + city ;

  const justOneTour = tours.length == 1;
  const cssClass_justOneTour = justOneTour ? "just-one-tour" : "";


  return (

    <div id={id} className={`${styles['namespace-container']} ${className} clearfix`}>

      <section className={`tour-section clearfix ${cssClass_justOneTour}`}>
        {tours?.map((tour, idx) => {
          
          const slug: string = tour?.slug?.current ?? '';
          const isEvenSlide = idx % 2 === 0;
          const isOddSlide = idx % 2 === 1;
          const cssClass_odd = isOddSlide ? "odd" : "" ;
          return(
            <div className={`tour ${cssClass_odd} clearfix`} key={idx}>
                
                  <div className="col col-image" >
                    <Link href={`${linkPrefix}/tur/${slug}`} className="clearfix h-100 display-block" scroll={true} rel="noreferrer noopener"> <Image src={tour?.profileImage?.image || "/public/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" alt={`${tour.name} cover photo`} fill /></Link>
                    
                    <div className='tour-title-on-mobile font-bold hide-on-desktop diff-sibiu-valcea diff-background'>{tour?.name}</div>
                    <Link className="btn btn-primary btn-invert hide-on-desktop prevent-default-highlight" href={`${linkPrefix}/tur/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                  </div>

                  <div className="col col-description hide-on-mobile">
                    <h6 className='font-bold'>{tour?.name}</h6>
                    <span className='hide-long-text-11 hide-on-mobile has-portable-text'><PortableText value={tour?.description} /></span>
                    <Link className="btn btn-secondary btn-invert  prevent-default-highlight" href={`${linkPrefix}/tur/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                  </div>
                  
                  <div className="pin diff-sibiu-valcea diff-background hide-on-mobile"></div>

            </div>)
          
        })}
    </section>

  </div>
  );
}