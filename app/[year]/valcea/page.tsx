import { getEvents, getProjects, getTours} from "@/sanity/sanity.query";
import CoverSection from "@/app/components/global/cover-section";
import TeamSection from "@/app/components/global/team-section";
import SwiperResponsive from "@/app/components/swiper/swiper-responsive/swiper-responsive";
import MissionSection from "@/app/components/components-server/mission-section";
import { ContactForm } from "@/app/components/contact-form/contact-form";
import styles from './page.module.scss';
import ToursSection from "@/app/components/components-server/tour-section";
import EventSection from "@/app/components/components-server/event-section";
import SeeMapSection from "@/app/components/components-server/see-map-section";

export default async function Valcea({ params}: {params: Promise<{ year:string}>}) {

  const { year } = await params;

  let projects = await getProjects("projects-valcea", year);
  var tours = await getTours("tours-valcea");
  var events = await getEvents("events-valcea");

    projects = [...projects, ...projects, ...projects];

  const mid = Math.ceil(projects.length / 2);
  const projects1 = projects.slice(0, mid);
  const projects2 = projects.slice(mid);

  return (
    <main className={`${styles['page-container']} `}>
      
      <CoverSection page={"valcea"}/>
      <SeeMapSection page={"valcea"} />
      
      <ToursSection tours={tours} page={"valcea"}/>
      <EventSection events={events} page={"valcea"}/>

      <section className="swiper-section"><SwiperResponsive projects={projects1}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects2} odd={true}/></section>

      <MissionSection page={"valcea"}/>

      {/* <section className="swiper-section"><SwiperResponsive projects={projects1}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects2} odd={true}/></section> */}

      <section className="team-section"><TeamSection page={"valcea"}/></section>

      <section className="contact-section position-relative"><ContactForm /></section>


    </main>
  );
}