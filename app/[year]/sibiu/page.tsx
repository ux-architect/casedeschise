import { getEvents, getGeneralInfo, getProjects, getTours } from "@/sanity/sanity.query";
import CoverSection from "../../components/global/cover-section";
import TeamSection from "@/app/components/global/team-section";
import styles from './page.module.scss';
import SwiperResponsive from "@/app/components/swiper/swiper-responsive/swiper-responsive";
import MissionSection from "@/app/components/components-server/mission-section";
import { ContactForm } from "@/app/components/contact-form/contact-form";
import ToursSection from "@/app/components/components-server/tour-section";
import EventSection from "@/app/components/components-server/event-section";
import SeeMapSection from "@/app/components/components-server/see-map-section";
import { SiteInfoType } from "@/types";

export default async function Sibiu({ params}: {params: Promise<{ year:string }>;}) {

  const { year } = await params;

  // const generalInfo: SiteInfoType = await getGeneralInfo();

  const projects = await getProjects("projects-sibiu", year);
  const projects_section1 = projects.filter((p: { metadata: { section: string; }; }) => p.metadata?.section === "1");
  const projects_section2 = projects.filter((p: { metadata: { section: string; }; }) => p.metadata?.section === "2");
  const projects_section3 = projects.filter((p: { metadata: { section: string; }; }) => p.metadata?.section === "3");
  const projects_section4 = projects.filter((p: { metadata: { section: string; }; }) => p.metadata?.section === "4");
  // Optionally, for those with missing or unexpected section values:
  const projects_other = projects.filter((p: { metadata: { section: any; }; }) => !["1", "2", "3", "4"].includes(p.metadata?.section ?? ""));

  projects_section1.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));
  projects_section2.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));
  projects_section3.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));
  projects_section4.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));

  projects_other.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));



  var tours = await getTours("tours-sibiu");
  var events = await getEvents("events-sibiu");
  tours.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));
  events.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));

  return (
    <main className={`${styles['page-container']} `} data-no-highlight-on-nav>
      <CoverSection page={"sibiu"} />
      

      {/* <div style={{ height: '2800px' }} /> */}

      <div id="obiective" className="section-title-on-mobile font-safiro hide-on-desktop diff-sibiu-valcea diff-background">Obiective :</div>
      {projects_section1.length > 0 && (<section className="swiper-section"><SwiperResponsive projects={projects_section1}/></section>)}
      {projects_section2.length > 0 && (<section className="swiper-section"><SwiperResponsive projects={projects_section2} odd={true}/></section>)}
      
      <SeeMapSection page={"sibiu"} />

      {projects_section3.length > 0 && (<section className="swiper-section"><SwiperResponsive projects={projects_section3}/></section>)}
      {projects_section4.length > 0 && (<section className="swiper-section"><SwiperResponsive projects={projects_section4} odd={true}/></section>)}

      <div id="tururi" className="section-title-on-mobile font-safiro hide-on-desktop diff-sibiu-valcea diff-background">Tururi :</div>
      <ToursSection tours={tours} page={"sibiu"}/>
      {/* <SeeMapSection page={"sibiu"} /> */}
      
      <div className="hide-on-mobile"><MissionSection page={"sibiu"}/></div>
      
      <div id="evenimente" className="section-title-on-mobile font-safiro hide-on-desktop diff-sibiu-valcea diff-background font-size-45">Evenimente :</div>
      <EventSection events={events} page={"sibiu"}/>

      <section className="team-section hide-on-mobile"><TeamSection page={"sibiu"}/></section>

      {/* <section className="swiper-section"><SwiperResponsive projects={projects_other} odd={true}/></section> */}

      <ContactForm />

    </main>
  );
}