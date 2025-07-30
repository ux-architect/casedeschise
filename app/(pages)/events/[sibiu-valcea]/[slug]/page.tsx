

import styles from './page.module.scss';
import { getEvent } from "@/sanity/sanity.query";
import { EventType } from "@/types";
import SwiperComponent from "@/app/components/swiper/swiper-component";
import { PortableText } from "next-sanity";
import GoogleMapComponent from "@/app/components/google-maps/google-map";
import { ContactForm } from '@/app/components/contact-form/contact-form';

export default async function ProjectPage({ params}: {params: Promise<{ "sibiu-valcea": string, slug: string }>;}) {
  const { ["sibiu-valcea"]: city, slug } = await params;
  const event = await getEvent(slug) as EventType;

  const cssClass_city = city ;

  return (
    <>
      <main className={`${styles['namespace-container']} `}>

        <section className="swiper-section"><SwiperComponent images={event?.images} projectName={event?.name} /></section>

        <section className="info border-bottom">
          <div className="col col-1 h1"><h1>{event?.name}</h1></div>
          <div className="col col-2">
            {event?.visitTime?.map((time, idx) => (
              <span key={idx} className={`date`}>{time}</span>
            ))}
          </div>
        </section>

        <section className="info border-bottom">
          <div className="col col-1">
              <span className="label">Adresa</span>
              <span className="info">{event?.address}</span>
          </div>

          {event?.transport && (
            <div className="col col-2">
              <span className="label">Transport in comun</span>
              <span className="info">{event.transport}</span>
            </div>
          )}
        </section>

        <section className="info border-bottom">
          <div className="col col-1"><PortableText value={event?.description} /></div>
          <div className="col col-2"><div className="map-container"><GoogleMapComponent /></div></div>
        </section>

      </main>

      <ContactForm />
    </>
  );
}