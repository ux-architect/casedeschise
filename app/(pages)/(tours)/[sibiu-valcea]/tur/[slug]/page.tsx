

import styles from './page.module.scss';
import { getEvents, getGeneralInfo, getTour, getTours } from "@/sanity/sanity.query";
import { SiteInfoType, TourType } from "@/types";
import SwiperComponent from "@/app/components/swiper/swiper-images";
import { PortableText } from "next-sanity";
import SeeMapSection from '@/app/components/components-server/see-map-section';
import PartnerSection from '@/app/components/components-server/partner-section';
import FaqSection from '@/app/components/components-server/faq-section';
import FooterSection from '@/app/components/components-server/footer-section';
import Link from 'next/link';
import Tags from '@/app/components/components-server/tags';
import Swiper_Events from '@/app/components/swiper/swiper-events/swiper-events';
import Swiper_Tours from '@/app/components/swiper/swiper-tours/swiper-tours';

export default async function ProjectPage({ params}: {params: Promise<{ "sibiu-valcea": string, slug: string }>;}) {
  const { ["sibiu-valcea"]: city, slug } = await params;

   const generalInfo: SiteInfoType = await getGeneralInfo();
   const year = generalInfo?.currentYear;
   const visitFormExternalUrl = city == "sibiu" ? generalInfo?.externalFormLinks_sibiu?.visitFormExternalUrl || "#" : generalInfo?.externalFormLinks_valcea?.visitFormExternalUrl || "#";


   const allTours = await getTours("tours-" + city, year);
   const allEvents = await getEvents("events-" + city, year);

   const tour = allTours.find((event: TourType) => event.slug.current === slug) as TourType;
   // get tours in the same section
   const tour_in_same_section = allTours.filter((event: { slug:{ current:string }, metadata: { section: string; }; }) => event.slug.current !== slug);

  const gps = tour?.gps?.split(',').map((p: string) => p.trim()) ?? [];
  const lat = gps[0]  || '';
  const lng = gps[1]  || '';

  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng} (${encodeURIComponent(tour?.name)})&z=${18}`;
  const seeMapSecrionUrl = "/" + city + "/map?select=" + tour?.slug.current + "&centerLat=" + lat  + "&centerLng=" + lng + "&z=12";


  return (
    <>
      <main className={`${styles['namespace-container']} common-page-structure`}>

        <section className="swiper-section">
          <SwiperComponent images={tour?.images} projectName={tour?.name} />
          <Link id="signup" className="btn btn-secondary btn-hover-overlay prevent-default-highlight diff-sibiu-valcea diff-background btn-large hide-on-mobile hide-while-still-loading" href={visitFormExternalUrl} target="_blank" scroll={true} rel="noreferrer noopener">ÎNSCRIE-TE</Link>
        </section>

        <section  className="info border-bottom">

          <div className="col col-1">
            <h1 className='font-safiro  mb-0 mt-0'>{tour?.name}</h1>
          </div>

          <div className="col col-2">
            {tour?.visitTime?.map((time, idx) => (<span key={idx} className={`date diff-sibiu-valcea`}>{time}</span>))}
            <Link id="signup" className="btn btn-secondary z-index-0 btn-hover-overlay prevent-default-highlight diff-sibiu-valcea diff-background btn-large hide-on-desktop hide-while-still-loading" href={visitFormExternalUrl} target="_blank" scroll={true} rel="noreferrer noopener">ÎNSCRIE-TE</Link>
          </div>

        </section>

        <section id="details-and-map-section" className="info border-bottom ">
          <div className="col col-1 has-portable-text"><PortableText value={tour?.description} /></div>
          <div className="col col-2">
              <div className="map-container">
                <SeeMapSection page={city} customUrl={seeMapSecrionUrl} externalMapsUrl={mapsUrl}/>
              </div>
          </div>
        </section>

        <section id="other-info-section" className="info border-bottom ">
            <div className="col col-1 has-portable-text"><PortableText value={tour?.otherInfo} /></div>
            <div className="col col-2"><Tags tags={tour?.tags}></Tags></div>
        </section>

        {tour_in_same_section.length > 0 && (
        <>
          <section className="swiper-section-similar-projects float-left clearfix">
            <Swiper_Tours tours={tour_in_same_section} title="Vezi și..." />
          </section>
        </>)}
        
          {/* if no other tours - show events instead */}
        {tour_in_same_section.length == 0 && (
        <>
          <section className="swiper-section-similar-projects float-left clearfix">
            <Swiper_Events events={allEvents} title="Vezi și..."/>
          </section>
        </>)}

        <FaqSection city={city} />
        <PartnerSection page={city} />
        <FooterSection city={city}/>
      </main>
    </>
  );
}