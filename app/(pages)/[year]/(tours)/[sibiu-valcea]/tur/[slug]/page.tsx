

import styles from './page.module.scss';
import { getTour } from "@/sanity/sanity.query";
import { TourType } from "@/types";
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
  const project = await getTour(slug) as TourType;

  const cssClass_city = city ;

  return (
    <>
      <main className={`${styles['namespace-container']} `}>

        <section className="swiper-section"><SwiperComponent images={project?.images} projectName={project?.name} /></section>

        <section className="info border-bottom">
          <div className="col col-1 h1"><h1>{project?.name}</h1></div>
          <div className="col col-2">
            {project?.visitTime?.map((time, idx) => (
              <span key={idx} className={`date diff-sibiu-valcea`}>{time}</span>
            ))}
          </div>
        </section>

        <section className="info border-bottom">
          <div className="col col-1">
              <span className="label">Adresa</span>
              <span className="info">{project?.address}</span>
          </div>
        </section>

        <section className="info border-bottom">
          <div className="col col-1"><PortableText value={project?.description} /></div>
          <div className="col col-2"><div className="map-container"><SeeMapSection page={"sibiu"} /></div></div>
        </section>

      </main>

      <FaqSection city={city} />
      <PartnerSection page={city} />
      {/* <ContactForm /> */}
      <FooterSection page={city}/>
    </>
  );
}