

import styles from './cover-section.module.scss';
import Image from "next/image";
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";
import Link from 'next/link';

type CityKey = 'sibiu' | 'valcea';

export default async function CoverSection({ page = 'sibiu' }: { page: CityKey; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
  let url_cover = generalInfo?.cityPageCover?.[page]?.url || null;
  let url_logo = `/images/case-${page}-color.png`;


  return (

    <div className={`${styles['cover-section']} overlay`} >

        <Image src={`${url_cover}`} className="object-cover" fill priority data-wait-for-image sizes="(max-width: 768px) 70vw, 100vw" alt="cover"/>
        <div className={`logo hide-while-still-loading` }><Image src={`${url_logo}`} className="object-contain" fill priority unoptimized sizes="(max-width: 768px) 100vw, 33vw" alt="cover"/></div>

        <h1 className={'event-title hide-while-still-loading diff-sibiu-valcea text-uppercase font-safiro'}>Case Deschise</h1>
        <h2 className={'event-date hide-while-still-loading diff-sibiu-valcea font-safiro'}>{generalInfo?.eventDate}</h2>
        
        <div id="signup" className="w-100 clearfix hide-while-still-loading">
          <Link  className="btn btn-primary btn-large diff-sibiu-valcea" href={`/`} scroll={true} rel="noreferrer noopener">ÎNSCRIE-TE</Link>
        </div>
        
    </div>
  );
}