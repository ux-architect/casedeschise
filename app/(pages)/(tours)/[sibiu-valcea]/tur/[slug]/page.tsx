

import styles from './page.module.scss';
import { getGeneralInfo, getTour, getTours } from "@/sanity/sanity.query";
import { SiteInfoType, TourType } from "@/types";
import SwiperComponent from "@/app/components/swiper/swiper-component";
import { PortableText } from "next-sanity";
import { ContactForm } from '@/app/components/contact-form/contact-form';
import SeeMapSection from '@/app/components/components-server/see-map-section';
import PartnerSection from '@/app/components/components-server/partner-section';
import FaqSection from '@/app/components/components-server/faq-section';
import FooterSection from '@/app/components/components-server/footer-section';
import ToursSection from '@/app/components/components-server/tour-section';

export default async function ProjectPage({ params}: {params: Promise<{ "sibiu-valcea": string, slug: string }>;}) {
  const { ["sibiu-valcea"]: city, slug } = await params;

   const generalInfo: SiteInfoType = await getGeneralInfo();
   const year = generalInfo?.currentYear;
   
   const allTours = await getTours("tours-" + city, year);
   const tour = allTours.find((event: TourType) => event.slug.current === slug) as TourType;
   // get tours in the same section
   const tour_in_same_section = allTours.filter((event: { slug:{ current:string }, metadata: { section: string; }; }) => event.slug.current !== slug);


  return (
    <>
      <main className={`${styles['namespace-container']} `}>

        <section className="swiper-section"><SwiperComponent images={tour?.images} projectName={tour?.name} /></section>

        <section className="info border-bottom">
          <div className="col col-1">
            <h1 className='font-safiro  mb-0 mt-0'>{tour?.name}</h1>
          </div>
          <div className="col col-2">
            {tour?.visitTime?.map((time, idx) => (
              <span key={idx} className={`date diff-sibiu-valcea`}>{time}</span>
            ))}
          </div>
        </section>

        {/* <section className="info border-bottom">
          <div className="col col-1">
              <span className="label">Adresa</span>
              <span className="info">{tour?.address}</span>
          </div>
        </section> */}

        <section className="info border-bottom">
          <div className="col col-1 has-portable-text"><PortableText value={tour?.description} /></div>
          <div className="col col-2"><div className="map-container"><SeeMapSection page={"sibiu"} /></div></div>
        </section>

            {tour_in_same_section.length > 0 && (
            <>
              <h6 className='section-title-similar-projects font-safiro'>Vezi și</h6>
              <section className="swiper-section-similar-projects clearfix">
                <ToursSection page={city} tours={tour_in_same_section} />
              </section>
            </>)}

      

        <FaqSection city={city} />
        <PartnerSection page={city} />
        {/* <ContactForm /> */}
        <FooterSection page={city}/>
      </main>
    </>
  );
}