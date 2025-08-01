import { getProjects, getTours } from "@/sanity/sanity.query";
import CoverSection from "../../components/global/cover-section";
import TeamSection from "@/app/components/global/team-section";
import styles from './page.module.scss';
import SwiperResponsive from "@/app/components/swiper/swiper-responsive/swiper-responsive";
import MissionSection from "@/app/components/global/mission-section";
import { ContactForm } from "@/app/components/contact-form/contact-form";
import ToursSection from "@/app/components/components-server/tour-section";
import EventSection from "@/app/components/components-server/event-section";
import SeeMapSection from "@/app/components/components-server/see-map-section";

export default async function Sibiu({ params}: {params: Promise<{ year:string }>;}) {

  const { year } = await params;

  var projects = await getProjects("projects-sibiu", year);
  var tours = await getTours("tours-sibiu");
  var events = await getTours("events-sibiu");

  projects = [...projects, ...projects, ...projects];

  const mid = Math.ceil(projects.length / 2);
  const projects1 = projects.slice(0, mid);
  const projects2 = projects.slice(mid);

  return (
    <main className={`${styles['page-container']} `}>
      <CoverSection page={"sibiu"} />
      {/* <div style={{ height: '2800px' }} /> */}
      <section id="cladiri" className="swiper-section "><SwiperResponsive projects={projects1}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects2} odd={true}/></section>
      <SeeMapSection page={"sibiu"} />

      <MissionSection page={"sibiu"}/>

      <ToursSection tours={tours} page={"sibiu"}/>
      <EventSection events={events} page={"sibiu"}/>

      {/* <section className="swiper-section"><SwiperResponsive projects={projects1}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects2} odd={true}/></section> */}



      <section className="team-section hide-on-mobile"><TeamSection page={"sibiu"}/></section>

      <ContactForm />

    </main>
  );
}