import { getProjects} from "@/sanity/sanity.query";
import ProjectList from "../../components/project-list";
import CoverSection from "@/app/components/global/cover-section";
import TeamSection from "@/app/components/global/team-section";
import SwiperResponsive from "@/app/components/swiper/swiper-responsive/swiper-responsive";
import MissionSection from "@/app/components/global/mission-section";
import { ContactForm } from "@/app/components/contact-form/contact-form";
import styles from './page.module.scss';

export default async function Valcea() {

  let projects = await getProjects("projects-valcea");

    projects = [...projects, ...projects, ...projects];

  const mid = Math.ceil(projects.length / 2);
  const projects1 = projects.slice(0, mid);
  const projects2 = projects.slice(mid);

  return (
    <main className={`${styles['page-container']} `}>
      
      <CoverSection page={"valcea"}/>
      
      
      <section className="swiper-section"><SwiperResponsive projects={projects1}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects2} odd={true}/></section>

      <MissionSection page={"valcea"}/>

      <section className="swiper-section"><SwiperResponsive projects={projects1}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects2} odd={true}/></section>

      <section className="team-section"><TeamSection page={"valcea"}/></section>

      <section className="contact-section position-relative"><ContactForm /></section>


    </main>
  );
}