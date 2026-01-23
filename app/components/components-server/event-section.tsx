

import './event-section.scss';
import { EventType, SiteInfoType } from "@/types";
import Image from "next/image";
import { PortableText } from 'next-sanity';

import Link from 'next/link';
import { getGeneralInfo } from '@/sanity/sanity.query';


export default async function EventSection({ className="",sectionName = "", events, page, signupForm = false }: { className?:string, sectionName?:string, events: EventType[], page: string, signupForm?:boolean, }) {

  const generalInfo: SiteInfoType = await getGeneralInfo();
  const city :string = page == "sibiu" ? "sibiu": "valcea";

  const formKidsActivitiesUrl = city == "sibiu" ? generalInfo?.externalFormLinks_sibiu?.kidsWorkshopFormExternalUrl || "" : generalInfo?.externalFormLinks_valcea?.kidsWorkshopFormExternalUrl || "" ;
  const linkPrefix = "/" + city ;

  return (

    <div id="nsc--event-section">
      <div className={`category-title diff-sibiu-valcea ${className}`}>{sectionName}</div>
      <section className={`event-section clearfix ${className}`}>
        {events?.map((event, idx) => {
          
          const slug: string = event?.slug?.current ?? '';
          const isEvenSlide = idx % 2 === 0;
          const isOddSlide = idx % 2 === 1;
          const cssClass_odd = isOddSlide ? "odd" : "" ;

          
          const parts = event?.name.split('///').map(p => p.trim());
          const title = parts[0];
          const subtitle = parts[1];

          return(
            <div className={`event ${cssClass_odd} clearfix diff-sibiu-valcea diff-background`} key={idx}>
                
                 <div className="col col-1 col-image inner-shadow-left inner-shadow-right" >
                    <div className="col-inner">
                      <Link href={`${linkPrefix}/event/${slug}`} scroll={true} rel="noreferrer noopener"> <Image src={event?.profileImage1.image || "/public/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 25vw" alt={`${event.name} cover photo`} fill /></Link>
                    </div>
                  </div>

                  {/* <Link href={`${linkPrefix}/event/${slug}`} scroll={true} className="title-link" rel="noreferrer noopener"> */}
                    <div className="col col-2 col-title  diff-sibiu-valcea diff-background" >
                      <div className="col-inner">
                        <h6 className='font-bold title font-safiro'>{title}</h6>
                        <h6 className='font-regular subtitle'>{subtitle}</h6>
                       {signupForm && (<Link className="btn btn-primary diff-sibiu-valcea " href={formKidsActivitiesUrl} target="_blank">ÎNSCRIE-TE</Link>)}
                      </div>
                    </div>
                  {/* </Link> */}

                  <div className="col col-3 inner-shadow-left inner-shadow-right">
                    <div className="col-inner">
                      <Link href={`${linkPrefix}/event/${slug}`} scroll={true} rel="noreferrer noopener"> <Image src={event?.profileImage2.image || "/public/should-not-happen.jpg"} className="object-cover"  loading="lazy" sizes="(max-width: 768px) 100vw, 25vw" alt={`${event.name} cover photo`} fill /></Link>
                    </div>
                  </div>

                  <div className="col col-4 col-description ">
                    <div className="col-inner">
                      <span className='hide-long-text-12 hide-on-mobile has-portable-text'><PortableText value={event?.description} /></span>
                      <Link className="btn btn-primary diff-sibiu-valcea " href={`${linkPrefix}/event/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                    </div>
                  </div>
                  
                  
                  <div className="pin"></div>

            </div>)
          
        })}
    </section>

  </div>
  );
}