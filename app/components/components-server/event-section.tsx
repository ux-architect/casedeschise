

import styles from './event-section.module.scss';
import { EventType } from "@/types";
import Image from "next/image";
import { PortableText } from 'next-sanity';

import Link from 'next/link';


export default async function EventSection({ events, page }: { events: EventType[], page: string }) {


  const city :string = page == "sibiu" ? "sibiu": "valcea";

  return (

    <div className={`${styles['namespace-container']} `}>

      <section className={`event-section clearfix`}>
        {events?.map((event, idx) => {
          
          const slug: string = event?.slug?.current ?? '';
          return(
            <div className="tour clearfix" key={idx}>
                
                  <Link className="col col-image" href={`${city}/${slug}`} scroll={true} rel="noreferrer noopener">

                    <Image src={event?.profileImage.image || "/should-not-happen.jpg"} className="object-cover" alt={`${event.name} logo`} fill />
                  </Link>

                  <div className="col col-description">
                    <h6 className='font-bold'>{event?.name}</h6>
                    <span className='hide-long-text-6'><PortableText value={event?.description} /></span>
                    <Link className="btn btn-primary" href={`${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                  </div>
                  
                  
                  <div className="pin"></div>

            </div>)
          
        })}
    </section>

  </div>
  );
}