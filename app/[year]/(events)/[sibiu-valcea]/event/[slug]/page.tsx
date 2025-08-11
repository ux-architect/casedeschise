

import styles from './page.module.scss';
import { getEvent } from "@/sanity/sanity.query";
import { EventType } from "@/types";
import SwiperComponent from "@/app/components/swiper/swiper-component";
import { PortableText } from "next-sanity";
import GoogleMapComponent from "@/app/components/google-maps/google-map";
import { ContactForm } from '@/app/components/contact-form/contact-form';
import SeeMapSection from '@/app/components/components-server/see-map-section';
import PartnerSection from '@/app/components/components-server/partner-section';
import FaqSection from '@/app/components/components-server/faq-section';
import FooterSection from '@/app/components/components-server/footer-section';

export default async function ProjectPage({ params}: {params: Promise<{ "sibiu-valcea": string, slug: string }>;}) {
  const { ["sibiu-valcea"]: city, slug } = await params;
  const event = await getEvent(slug) as EventType;

  const cssClass_city = city ;

  const parts = event?.name.split('///').map(p => p.trim());
          const title = parts[0]  || '';
          const subtitle = parts[1]  || '';

  return (
    <>
      <main className={`${styles['namespace-container']} `}>

        <section className="swiper-section"><SwiperComponent images={event?.images} projectName={event?.name} /></section>

        <section className="info border-bottom">
          <div className="col col-1">
            <h1 className='font-safiro'>{title}</h1>
            <h2>{subtitle}</h2>
          </div>
          <div className="col col-2">
            {event?.visitTime?.map((time, idx) => (
              <span key={idx} className={`date diff-sibiu-valcea`}>{time}</span>
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
          <div className="col col-2"><div className="map-container"><SeeMapSection page={city} /></div></div>
        </section>

      </main>

      <FaqSection page={city} />
      <PartnerSection page={city} />
      {/* <ContactForm /> */}
      <FooterSection page={city}/>
    </>
  );
}