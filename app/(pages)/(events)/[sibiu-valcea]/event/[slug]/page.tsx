

import styles from './page.module.scss';
import { getEvent, getEvents, getGeneralInfo, getProjects } from "@/sanity/sanity.query";
import { EventType, ProjectType, SiteInfoType } from "@/types";
import SwiperComponent from "@/app/components/swiper/swiper-component";
import { PortableText } from "next-sanity";
import { ContactForm } from '@/app/components/contact-form/contact-form';
import SeeMapSection from '@/app/components/components-server/see-map-section';
import PartnerSection from '@/app/components/components-server/partner-section';
import FaqSection from '@/app/components/components-server/faq-section';
import FooterSection from '@/app/components/components-server/footer-section';
import EventSection from '@/app/components/components-server/event-section';

export default async function ProjectPage({ params}: {params: Promise<{ "sibiu-valcea": string, slug: string }>;}) {
  const { ["sibiu-valcea"]: city, slug } = await params;

  const generalInfo: SiteInfoType = await getGeneralInfo();
  const year = generalInfo?.currentYear;
  
  const allEvents = await getEvents("events-" + city, year);
  const event = allEvents.find((event: EventType) => event.slug.current === slug) as EventType;
  // get events in the same section
  const events_in_same_section = allEvents.filter((event: { slug:{ current:string }, metadata: { section: string; }; }) => event.slug.current !== slug);



  const parts = event?.name.split('///').map((p: string) => p.trim()) ?? [];
          const title = parts[0]  || '';
          const subtitle = parts[1]  || '';

  return (
    <>
      <main className={`${styles['namespace-container']} `}>

        <section className="swiper-section"><SwiperComponent images={event?.images} projectName={event?.name} /></section>

        <section className="info border-bottom">
          <div className="col col-1">
            <h1 className='font-safiro  mb-0 mt-0'>{title}</h1>
            <h2>{subtitle}</h2>
          </div>
          <div className="col col-2">
            {event?.visitTime?.map((time:string, idx:number) => (
              <span key={idx} className={`date diff-sibiu-valcea`}>{time}</span>
            ))}
          </div>
        </section>

        <section className="info border-bottom">
          <div className="col col-1">
              <span className="label">Adresa</span>
              <span className="info">{event?.address}</span>
          </div>

        </section>

        <section className="info border-bottom">
          <div className="col col-1 has-portable-text"><PortableText value={event?.description} /></div>
          <div className="col col-2"><div className="map-container"><SeeMapSection page={city} /></div></div>
        </section>

      

        {events_in_same_section.length > 0 && (
        <>
          <h6 className='section-title-similar-projects font-safiro'>Vezi și</h6>
          <section className="swiper-section-similar-projects clearfix">
            <EventSection page={city} events={events_in_same_section} />
          </section>
        </>)}

      

        <FaqSection city={city} />
        <PartnerSection page={city} />
        {/* <ContactForm /> */}
        <FooterSection page={city}/>
      </main>
    </>
  );
}