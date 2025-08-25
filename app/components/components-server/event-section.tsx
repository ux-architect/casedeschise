

import styles from './event-section.module.scss';
import { EventType } from "@/types";
import Image from "next/image";
import { PortableText } from 'next-sanity';

import Link from 'next/link';


export default async function EventSection({ events, page }: { events: EventType[], page: string }) {


  const city :string = page == "sibiu" ? "sibiu": "valcea";
  const linkPrefix = "/" + city ;

  return (

    <div className={`${styles['namespace-container']} `}>

      <section className={`event-section clearfix`}>
        {events?.map((event, idx) => {
          
          const slug: string = event?.slug?.current ?? '';
          const isEvenSlide = idx % 2 === 0;
          const isOddSlide = idx % 2 === 1;
          const cssClass_odd = isOddSlide ? "odd" : "" ;

          
          const parts = event?.name.split('///').map(p => p.trim());
          const title = parts[0];
          const subtitle = parts[1];

          return(
            <div className={`event ${cssClass_odd} clearfix`} key={idx}>
                
                 <div className="col col-1 col-image inner-shadow-left inner-shadow-right" >
                    <Link href={`${linkPrefix}/event/${slug}`} scroll={true} rel="noreferrer noopener"> <Image src={event?.profileImage1.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" alt={`${event.name} cover photo`} fill /></Link>
                  </div>

                  <Link href={`${linkPrefix}/event/${slug}`} scroll={true} className="title-link" rel="noreferrer noopener">
                    <div className="col col-2 col-title  diff-sibiu-valcea diff-background" >
                        <h6 className='font-bold title font-safiro'>{title}</h6>
                        <h6 className='font-regular subtitle'>{subtitle}</h6>
                    </div>
                  </Link>

                  <div className="col col-3 inner-shadow-left inner-shadow-right">
                    <Link href={`${linkPrefix}/event/${slug}`} scroll={true} rel="noreferrer noopener"> <Image src={event?.profileImage2.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" alt={`${event.name} cover photo`} fill /></Link>
                  </div>

                  <div className="col col-4 col-description ">
                    <span className='hide-long-text-12 hide-on-mobile'><PortableText value={event?.description} /></span>
                    <Link className="btn btn-primary diff-sibiu-valcea " href={`${linkPrefix}/event/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                  </div>
                  
                  
                  <div className="pin"></div>

            </div>)
          
        })}
    </section>

  </div>
  );
}