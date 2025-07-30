

import styles from './cover-section.module.scss';
import Image from "next/image";
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";

type CityKey = 'sibiu' | 'valcea';

export default async function CoverSection({ page = 'sibiu' }: { page: CityKey; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
  let url_cover = generalInfo?.cityPageCover?.[page]?.url || null;
  let url_logo = `images/case-${page}-color.png`;


  return (

    <div className={`${styles['cover-section']} overlay`} >

        <Image src={`${url_cover}`} className="object-cover" fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="cover"/>
        <div className={`logo for-${page}`}><Image src={`${url_logo}`} className="object-contain" fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="cover"/></div>

        <h1 className={'event-title diff-sibiu-valcea text-uppercase font-safiro'}>Case Deschise</h1>
        <h2 className={'event-date diff-sibiu-valcea font-safiro'}>{generalInfo?.eventDate}</h2>
        {/* { url_subtitle && (<img className={'subtitle'} src={ url_subtitle}></img>)} */}


    </div>
  );
}