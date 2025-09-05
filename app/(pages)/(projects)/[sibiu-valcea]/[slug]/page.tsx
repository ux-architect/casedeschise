

import styles from './page.module.scss';
import { getGeneralInfo, getProjects } from "@/sanity/sanity.query";
import { ProjectType, SiteInfoType } from "@/types";
import SwiperComponent from "@/app/components/swiper/swiper-images";
import SwiperComponent from "@/app/components/swiper/swiper-images";
import { PortableText } from "next-sanity";
import { ContactForm } from '@/app/components/contact-form/contact-form';
import SeeMapSection from '@/app/components/components-server/see-map-section';
import PartnerSection from '@/app/components/components-server/partner-section';
import FooterSection from '@/app/components/components-server/footer-section';
import FaqSection from '@/app/components/components-server/faq-section';
import Link from 'next/link';
import Tags from '@/app/components/components-server/tags';
import Swiper_Projects from '@/app/components/swiper/swiper-projects/swiper-projects';

export default async function ProjectPage({ params}: {params: Promise<{"sibiu-valcea": string, slug: string }>;}) {
  const { ["sibiu-valcea"]: city, slug } = await params;

  const generalInfo: SiteInfoType = await getGeneralInfo();
  const year = generalInfo?.currentYear;
  const visitFormExternalUrl = generalInfo?.externalFormLinks_sibiu?.visitFormExternalUrl || "#";


  const allProjects = await getProjects("projects-" + city, year);
  const project = allProjects.find((p: ProjectType) => p.slug.current === slug);
    // get projects in the same section
  const projects_in_same_section = allProjects.filter((p: { slug:{ current:string }, metadata: { section: string; }; }) => p.metadata?.section === project.metadata?.section && p.slug.current !== project.slug.current);

  const parts = project?.name.split('///').map((p: string) => p.trim()) ?? [];
  const title = parts[0]  || '';
  const subtitle = parts[1]  || '';

  const gps = project?.gps?.split(',').map((p: string) => p.trim()) ?? [];
  const lat = gps[0]  || '';
  const lng = gps[1]  || '';

  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng} (${encodeURIComponent(title)})&z=${18}`;
  const seeMapSecrionUrl = "/" + city + "/map?select=" + project?.slug.current;

  return (
    <>
      <main className={`${styles['namespace-container']} `}>

        <section className="swiper-section">
          <SwiperComponent images={project?.images} projectName={project?.name} />
          <Link id="signup" className="btn btn-secondary diff-sibiu-valcea diff-background btn-large hide-on-mobile hide-while-still-loading" href={visitFormExternalUrl} target="_blank" scroll={true} rel="noreferrer noopener">ÎNSCRIE-TE</Link>
        </section>

        <section className="info border-bottom">

          <div className="col col-1">
            <h1 className='font-bold title font-safiro'>{title}</h1>
            <h1 className='font-regular subtitle'>{subtitle}</h1>
          </div>

          <div className="col col-2">
            {project?.visitTime?.map((time: string, idx: number) => (<span key={idx} className={`date diff-sibiu-valcea`}>{time}</span>))}    
          </div>
            <Link id="signup" className="btn btn-secondary diff-sibiu-valcea diff-background btn-large hide-on-desktop hide-while-still-loading" href={visitFormExternalUrl} target="_blank" scroll={true} rel="noreferrer noopener">ÎNSCRIE-TE</Link>
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
            <SeeMapSection page={city} customUrl={seeMapSecrionUrl}/>
            <Link className="btn btn-white btn-large open-in-google-maps" href={`${mapsUrl}`} scroll={true} target="_blank" rel="noreferrer noopener">DESCHIDE ÎN GOOGLE MAPS</Link>
            </div></div>
        </section>

        <section id="other-info-section" className="info border-bottom ">
          <div className="col col-1 has-portable-text"><PortableText value={project?.otherInfo} /></div>
          <div className="col col-2">

           <Tags tags={project?.tags}></Tags>

          </div>
        </section>

        {projects_in_same_section.length > 0 && (
          <>
            <section className="swiper-section-similar-projects clearfix">
              <Swiper_Projects projects={projects_in_same_section} title="Vezi și"/>
            </section>
          </>)}
        
        <FaqSection city={city} />
        <PartnerSection page={city} />
        <ContactForm />
        <FooterSection page={city}/>
      </main>
    </>
  );
}