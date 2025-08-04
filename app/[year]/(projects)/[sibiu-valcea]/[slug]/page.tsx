

import styles from './page.module.scss';
import { getProject } from "@/sanity/sanity.query";
import { ProjectType } from "@/types";
import SwiperComponent from "@/app/components/swiper/swiper-component";
import { PortableText } from "next-sanity";
import GoogleMapComponent from "@/app/components/google-maps/google-map";
import { ContactForm } from '@/app/components/contact-form/contact-form';
import SeeMapSection from '@/app/components/components-server/see-map-section';

export default async function ProjectPage({ params}: {params: Promise<{ year:string, "sibiu-valcea": string, slug: string }>;}) {
  const { year, ["sibiu-valcea"]: city, slug } = await params;
  const project = await getProject(slug) as ProjectType;

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

          {project?.transport && (
            <div className="col col-2">
              <span className="label">Transport in comun</span>
              <span className="info">{project.transport}</span>
            </div>
          )}
        </section>

        <section id="details-and-map-section" className="info border-bottom">
          <div className="col col-1"><PortableText value={project?.description} /></div>
          <div className="col col-2"><div className="map-container">
            {/* <GoogleMapComponent /> */}
            <SeeMapSection page={city} />
            </div></div>
        </section>

        <section id="other-info-section" className="info border-bottom ">
          <div className="col col-1 has-portable-text"><PortableText value={project?.otherInfo} /></div>
          <div className="col col-2"></div>
        </section>

      </main>

      <ContactForm />
    </>
  );
}