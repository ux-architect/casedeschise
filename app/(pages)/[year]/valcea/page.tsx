import { getEvents, getGeneralInfo, getProjects, getTours} from "@/sanity/sanity.query";
import CoverSection from "@/app/components/components-server/cover-section";
import TeamSection from "@/app/components/components-server/team-section";
import SwiperResponsive from "@/app/components/swiper/swiper-responsive/swiper-responsive";
import MissionSection from "@/app/components/components-server/mission-section";
import { ContactForm } from "@/app/components/contact-form/contact-form";
import styles from './page.module.scss';
import ToursSection from "@/app/components/components-server/tour-section";
import EventSection from "@/app/components/components-server/event-section";
import SeeMapSection from "@/app/components/components-server/see-map-section";
import { SiteInfoType } from "@/types";
import PartnerSection from "@/app/components/components-server/partner-section";
import FaqSection from "@/app/components/components-server/faq-section";
import FooterSection from "@/app/components/components-server/footer-section";

export default async function Valcea({ params}: {params: Promise<{ year:string}>}) {

  const { year } = await params;

    const generalInfo: SiteInfoType = await getGeneralInfo();
  
    const projects = await getProjects("projects-valcea", year);
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
  
  
  
    var tours = await getTours("tours-valcea");
    var events = await getEvents("events-valcea");
    tours.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));
    events.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));

  return (
    <main className={`${styles['page-container']} `}>
      
      <CoverSection page={"valcea"}/>



      
      <div id="obiective" className="section-title-on-mobile font-safiro hide-on-desktop diff-sibiu-valcea diff-background">Obiective :</div>
      {projects_section1.length > 0 && (<section className="swiper-section"><SwiperResponsive projects={projects_section1}/></section>)}
      {projects_section2.length > 0 && (<section className="swiper-section"><SwiperResponsive projects={projects_section2} odd={true}/></section>)}
      <SeeMapSection page={"valcea"} />
      {projects_section3.length > 0 && (<section className="swiper-section"><SwiperResponsive projects={projects_section3}/></section>)}
      {projects_section4.length > 0 && (<section className="swiper-section"><SwiperResponsive projects={projects_section4} odd={true}/></section>)}

      <div id="tururi" className="section-title-on-mobile font-safiro hide-on-desktop diff-sibiu-valcea diff-background">Tururi :</div>
      <ToursSection tours={tours} page={"valcea"}/>
      
      <div id="evenimente" className="section-title-on-mobile font-safiro hide-on-desktop diff-sibiu-valcea diff-background font-size-45">Evenimente :</div>
      <EventSection events={events} page={"valcea"}/>

     
      <div className="hide-on-mobile"><MissionSection page={"valcea"}/></div>
      {/* <section className="team-section hide-on-mobile"><TeamSection page={"valcea"}/></section> */}
      
      <FaqSection city={"sibiu"} />
      <PartnerSection page={"sibiu"} />
      <section className="contact-section position-relative"><ContactForm /></section>
      <FooterSection page={"sibiu"}/>

    </main>
  );
}