

import styles from './event-section.module.scss';
import { EventType } from "@/types";
import Image from "next/image";
import { PortableText } from 'next-sanity';

import Link from 'next/link';


export default async function EventSection({ events, page }: { events: EventType[], page: string }) {


  const city :string = page == "sibiu" ? "sibiu": "valcea";

  return (

    <div id="evenimente" className={`${styles['namespace-container']} `}>

      <section className={`event-section clearfix`}>
        {events?.map((event, idx) => {
          
          const slug: string = event?.slug?.current ?? '';
          const isEvenSlide = idx % 2 === 0;
          const isOddSlide = idx % 2 === 1;
          const cssClass_odd = isOddSlide ? "odd" : "" ;

          return(
            <div className={`event ${cssClass_odd} clearfix`} key={idx}>
                
                 <div className="col col-image" >
                    <Link href={`${city}/${slug}`} scroll={true} rel="noreferrer noopener"> <Image src={event?.profileImage1.image || "/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" alt={`${event.name} cover photo`} fill /></Link>
                  </div>

                  <div className="col col-description ">
                    <h6 className='font-bold'>{event?.name}</h6>
                    <span className='hide-long-text-12 hide-on-mobile'><PortableText value={event?.description} /></span>
                    <Link className="btn btn-secondary diff-sibiu-valcea diff-background" href={`${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                    <Link className="btn btn-secondary diff-sibiu-valcea diff-background btn-signup" href={`${city}/${slug}`} scroll={true} rel="noreferrer noopener" >ÎNSCRIE-TE</Link>
                  </div>
                  
                  
                  <div className="pin"></div>

            </div>)
          
        })}
    </section>

  </div>
  );
}