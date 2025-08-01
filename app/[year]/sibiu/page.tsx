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

  const generalInfo: SiteInfoType = await getGeneralInfo();

  const projects = await getProjects("projects-sibiu", year);
  const projects_section1 = projects.filter((p: { metadata: { section: string; }; }) => p.metadata?.section === "1");
  const projects_section2 = projects.filter((p: { metadata: { section: string; }; }) => p.metadata?.section === "2");
  const projects_section3 = projects.filter((p: { metadata: { section: string; }; }) => p.metadata?.section === "3");
  const projects_section4 = projects.filter((p: { metadata: { section: string; }; }) => p.metadata?.section === "4");
  // Optionally, for those with missing or unexpected section values:
  const projects_other = projects.filter((p: { metadata: { section: any; }; }) => !["1", "2", "3", "4"].includes(p.metadata?.section ?? ""));



  var tours = await getTours("tours-sibiu");
  var events = await getEvents("events-sibiu");

  // projects = [...projects, ...projects, ...projects];

  // const mid = Math.ceil(projects.length / 2);
  // const projects1 = projects.slice(0, mid);
  // const projects2 = projects.slice(mid);

  return (
    <main className={`${styles['page-container']} `}>
      <CoverSection page={"sibiu"} />

      <MissionSection page={"sibiu"}/>

      {/* <div style={{ height: '2800px' }} /> */}
      <section id="cladiri" className="swiper-section "><SwiperResponsive projects={projects_section1}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects_section2} odd={true}/></section>
      <SeeMapSection page={"sibiu"} />

      

      <ToursSection tours={tours} page={"sibiu"}/>
      <EventSection events={events} page={"sibiu"}/>

      <section className="swiper-section"><SwiperResponsive projects={projects_section3}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects_section4} odd={true}/></section>



      <section className="team-section hide-on-mobile"><TeamSection page={"sibiu"}/></section>

      <section className="swiper-section"><SwiperResponsive projects={projects_other} odd={true}/></section>

      <ContactForm />

    </main>
  );
}