

import styles from './page.module.scss';
import { getProject } from "@/sanity/sanity.query";
import { ProjectType } from "@/types";
import SwiperComponent from "@/app/components/swiper/swiper-component";
import { PortableText } from "next-sanity";
import GoogleMapComponent from "@/app/components/google-maps/google-map";
import { ContactForm } from '@/app/components/contact-form/contact-form';
import SeeMapSection from '@/app/components/components-server/see-map-section';
import PartnerSection from '@/app/components/components-server/partner-section';
import FooterSection from '@/app/components/components-server/footer-section';
import FaqSection from '@/app/components/components-server/faq-section';
import Link from 'next/link';

export default async function ProjectPage({ params}: {params: Promise<{ year:string, "sibiu-valcea": string, slug: string }>;}) {
  const { year, ["sibiu-valcea"]: city, slug } = await params;
  const project = await getProject(slug) as ProjectType;

    const parts = project?.name.split('///').map(p => p.trim()) ?? [];
    const title = parts[0]  || '';
    const subtitle = parts[1]  || '';

    const gps = project?.gps?.split(',').map(p => p.trim()) ?? [];
    const lat = gps[0]  || '';
    const lng = gps[1]  || '';
    
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng} (${encodeURIComponent(title)})&z=${18}`;

  return (
    <>
      <main className={`${styles['namespace-container']} `}>

        <section className="swiper-section"><SwiperComponent images={project?.images} projectName={project?.name} /></section>

        <section className="info border-bottom">

          <div className="col col-1">
            <h1 className='font-bold title font-safiro'>{title}</h1>
            <h1 className='font-regular subtitle'>{subtitle}</h1>
          </div>

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

        <section id="details-and-map-section" className="info border-bottom">
          <div className="col col-1"><PortableText value={project?.description} /></div>
          <div className="col col-2"><div className="map-container">
            <SeeMapSection page={city} />
            <Link className="btn btn-primary diff-sibiu-valcea open-in-google-maps" href={`${mapsUrl}`} scroll={true} target="_blank" rel="noreferrer noopener">DESCHIDE IN GOOGLE MAPS</Link>
            </div></div>
        </section>

        <section id="other-info-section" className="info border-bottom ">
          <div className="col col-1 has-portable-text"><PortableText value={project?.otherInfo} /></div>
          <div className="col col-2"></div>
        </section>

      </main>

      <FaqSection page={city} />
      <PartnerSection page={city} />
      <ContactForm />
      <FooterSection page={city}/>
    </>
  );
}