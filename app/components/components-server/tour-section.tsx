import styles from './tour-section.module.scss';
import { SiteInfoType, TourType } from "@/types";
import Image from "next/image";
import { PortableText } from 'next-sanity';

import Link from 'next/link';
import { getGeneralInfo } from '@/sanity/sanity.query';


export default async function ToursSection({ className = '', id = '', tours, page }: { className?: string, id?: string, tours: TourType[], page: string }) {


  const generalInfo: SiteInfoType = await getGeneralInfo();
  const visitFormExternalUrl = generalInfo?.externalFormLinks?.visitFormExternalUrl || "#";

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
                    <Link href={`${linkPrefix}/tur/${slug}`} scroll={true} rel="noreferrer noopener"> <Image src={tour?.profileImage?.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" alt={`${tour.name} cover photo`} fill /></Link>
                  </div>

                  <div className="col col-description ">
                    <h6 className='font-bold'>{tour?.name}</h6>
                    <span className='hide-long-text-12 hide-on-mobile'><PortableText value={tour?.description} /></span>
                    <Link className="btn btn-secondary diff-sibiu-valcea diff-background" href={`${linkPrefix}/tur/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                    <Link className="btn btn-secondary diff-sibiu-valcea diff-background btn-signup" href={visitFormExternalUrl} target="_blank" scroll={true} rel="noreferrer noopener" >ÎNSCRIE-TE</Link>
                  </div>
                  
                  <div className="pin diff-sibiu-valcea diff-background hide-on-mobile"></div>

            </div>)
          
        })}
    </section>

  </div>
  );
}