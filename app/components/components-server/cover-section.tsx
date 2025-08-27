

import styles from './cover-section.module.scss';
import Image from "next/image";
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";
import Link from 'next/link';
import type { CityKey } from "@/types";


export default async function CoverSection({ city = 'sibiu' }: { city?: CityKey; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
  let url_cover = generalInfo?.cityPageCover?.[city]?.url || null;
  let url_logo = `/images/case-${city}-color.png`;
  const linkPrefix =  "/" + city ;

  const visitFormExternalUrl = generalInfo?.externalFormLinks?.visitFormExternalUrl || "#";

  return (

    <div className={`${styles['cover-section']} overlay`} >
      
        {/* background image */}
        <Image src={`${url_cover}`} className="object-cover" fill priority data-wait-for-image sizes="(max-width: 768px) 70vw, 100vw" alt="cover"/>

        <Link href="/" className={`logo hide-while-still-loading` }><Image src={`${url_logo}`} className="object-contain" fill priority unoptimized sizes="(max-width: 768px) 100vw, 33vw" alt="cover"/></Link>

        <h1 className={'event-title hide-while-still-loading diff-sibiu-valcea text-uppercase font-safiro'}>Case Deschise</h1>
        <h2 className={'event-date hide-while-still-loading diff-sibiu-valcea font-safiro'}>{generalInfo?.eventDate}</h2>
        
        <div id="main-actions" className="w-100 clearfix hide-while-still-loading">
          <Link  className="btn btn-primary btn-large diff-sibiu-valcea" href={`${linkPrefix}/map`} scroll={true} rel="noreferrer noopener">HARTA</Link>
          <Link  className="btn btn-primary btn-large diff-sibiu-valcea" href={visitFormExternalUrl} target="_blank" scroll={true} rel="noreferrer noopener">ÎNSCRIE-TE</Link>
        </div>
        
    </div>
  );
}