import { getProjects } from "@/sanity/sanity.query";
import ProjectList from "../../components/project-list";
import CoverSection from "../../components/global/cover-section";
import TeamSection from "@/app/components/global/team-section";
import styles from './page.module.scss';
import SwiperResponsive from "@/app/components/swiper/swiper-responsive/swiper-responsive";
import MissionSection from "@/app/components/global/mission-section";

export default async function Sibiu() {

  var projects = await getProjects("projects-sibiu");
  projects = [...projects, ...projects, ...projects];

  const mid = Math.ceil(projects.length / 2);
  const projects1 = projects.slice(0, mid);
  const projects2 = projects.slice(mid);

  return (
    <main className={`${styles['page-container']} `}>
      <CoverSection page={"sibiu"}/>

      <section className="swiper-section"><SwiperResponsive projects={projects1}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects2} odd={true}/></section>

      <MissionSection page={"sibiu"}/>

      <section className="swiper-section"><SwiperResponsive projects={projects1}/></section>
      <section className="swiper-section"><SwiperResponsive projects={projects2} odd={true}/></section>
      
      <TeamSection page={"sibiu"}/>

      <ProjectList projects={projects}/>

    </main>
  );
}