import { getEvents, getGeneralInfo, getProjects, getTours } from "@/sanity/sanity.query";
import CoverSection from "@/app/components/components-server/cover-section";
import TeamSection from "@/app/components/components-server/team-section";
import styles from './page.module.scss';
import MissionSection from "@/app/components/components-server/mission-section";
import { ContactForm } from "@/app/components/contact-form/contact-form";
import ToursSection from "@/app/components/components-server/tour-section";
import EventSection from "@/app/components/components-server/event-section";
import SeeMapSection from "@/app/components/components-server/see-map-section";
import { SiteInfoType, CityKey, TourType, ProjectType } from "@/types";
import PartnerSection from "@/app/components/components-server/partner-section";
import FaqSection from "@/app/components/components-server/faq-section";
import FooterSection from "@/app/components/components-server/footer-section";
import SocialMediaSection from "@/app/components/components-ui/social-media-section";
import Swiper_Events from "@/app/components/swiper/swiper-events/swiper-events";
import Swiper_Projects from "@/app/components/swiper/swiper-projects/swiper-projects";

export default async function Main({ params}: {params: Promise<{"sibiu-valcea": string}>;}) {
  const { ["sibiu-valcea"]: city } = await params;

  const generalInfo: SiteInfoType = await getGeneralInfo();
  const year = generalInfo?.currentYear;

  const projects: ProjectType[] = await getProjects("projects-" + city, year);
  const projects_section1 = projects.filter((p) => p.metadata?.section === "1");
  const projects_section2 = projects.filter((p) => p.metadata?.section === "2");
  const projects_section3 = projects.filter((p) => p.metadata?.section === "3");
  const projects_section4 = projects.filter((p) => p.metadata?.section === "4");
  // Optionally, for those with missing or unexpected section values:
  const projects_other = projects.filter((p) => !["1", "2", "3", "4"].includes(p.metadata?.section ?? ""));

  projects_section1.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));
  projects_section2.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));
  projects_section3.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));
  projects_section4.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));

  projects_other.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));

  const tours: TourType[] = await getTours("tours-" + city, year);
  const justOneTour = tours.length == 1;
  const sectionTitle_onMobile = justOneTour ? "Tur Ghidat" : "Tururi Ghidate";

  var events = await getEvents("events-" + city, year);
  tours.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));
  events.sort((a: any, b: any) => parseInt(a.metadata?.index ?? '0') - parseInt(b.metadata?.index ?? '0'));

  const events_section1 = events.filter((p: TourType) => !p.tags?.includes("forChildren"));
  const events_section2_kids = events.filter((p: TourType) => p.tags?.includes("forChildren"));

  const sectionNames = generalInfo?.sectionNames?.find((ct) => ct.year === year);
  const title_s1 = city === "sibiu" ? sectionNames?.s1_sibiu : sectionNames?.s1_valcea;
  const title_s2 = city === "sibiu" ? sectionNames?.s2_sibiu : sectionNames?.s2_valcea;
  const title_s3 = city === "sibiu" ? sectionNames?.s3_sibiu : sectionNames?.s3_valcea;
  const title_s4 = city === "sibiu" ? sectionNames?.s4_sibiu : sectionNames?.s4_valcea;

  return (
    <main className={`${styles['page-container']} `} data-no-highlight-on-nav>
      <CoverSection city={city as CityKey} />
      <SocialMediaSection city={city} generalInfo={generalInfo}></SocialMediaSection>
      {/* <div style={{ height: '2800px' }} /> */}
     
      <div id="obiective" className="section-title-on-mobile font-safiro hide-on-desktop diff-sibiu-valcea diff-background">Obiective</div>
      {projects_section1.length > 0 && (<section className="swiper-section"><Swiper_Projects projects={projects_section1} title={title_s1}/></section>)}
      {projects_section2.length > 0 && (<section className="swiper-section"><Swiper_Projects projects={projects_section2} title={title_s2} odd={true} className="title-to-right"/></section>)}
      {projects_section3.length > 0 && (<section className="swiper-section"><Swiper_Projects projects={projects_section3} title={title_s3}/></section>)}
      {projects_section4.length > 0 && (<section className="swiper-section"><Swiper_Projects projects={projects_section4} title={title_s4} odd={true} className="title-to-right"/></section>)}
      
      <div className="see-map-container"><SeeMapSection page={city} className="w-100 clearfix float-left mt-10"/></div>
      
      <MissionSection page={city} className="hide-on-mobile"/>

      <div id="tururi" className="section-title-on-mobile font-safiro hide-on-desktop diff-sibiu-valcea diff-background">{sectionTitle_onMobile}</div>
      <ToursSection  tours={tours} page={city} className="mb-30"/>
  
      <div id="evenimente" className="event-title-on-mobile font-safiro hide-on-desktop diff-sibiu-valcea">Evenimente</div>
      {events_section1.length > 0 && (<section className="swiper-section"><Swiper_Events events={events_section1} title="Evenimente"/></section>)}
      
      <div id="activitati-copii" className="event-title-on-mobile event-title-kids-workshop font-safiro hide-on-desktop diff-sibiu-valcea mt-10">Activități copii</div>
      {events_section2_kids.length > 0 && (<section className="swiper-section"><Swiper_Events events={events_section2_kids} odd={true} title="Activități copii" className="title-to-right"/></section>)}

      <TeamSection page={city} id="echipa" className="desktop-version hide-on-mobile mt-50 mb-50"/>
      <FaqSection city={city} />
      <PartnerSection page={city} />
      {/* <div className="clearfix hide-on-mobile"><ContactForm/></div> */}
      <FooterSection city={city}/>
      
    </main>
  );
}