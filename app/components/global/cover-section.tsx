

import styles from './cover-section.module.scss';
import Image from "next/image";
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";

export default async function CoverSection({ page = 'sibiu' }: { page: string; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
 let url_cover, url_title, url_subtitle, url_logo;
  
  if(page == "sibiu"){
    url_cover = generalInfo?.coverSibiu?.[0]?.image || null;
    url_title = generalInfo?.coverSibiu?.[1]?.image || null;
    url_subtitle = generalInfo?.coverSibiu?.[2]?.image || null;
    url_logo = "images/case-sibiu-color.png";
  }
if(page == "valcea"){
    url_cover = generalInfo?.coverValcea?.[0]?.image || null;
    url_title = generalInfo?.coverValcea?.[1]?.image || null;
    url_subtitle = generalInfo?.coverValcea?.[2]?.image || null;
    url_logo = "images/case-valcea-color.png";
  }

  return (

    <div className={`${styles['cover-section']} overlay`} >

        <Image src={`${url_cover}`} className="object-cover" fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="cover"/>
        <div className={`logo for-${page}`}><Image src={`${url_logo}`} className="object-contain" fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="cover"/></div>

        { url_title && (<img className={'title'} src={url_title} ></img>)}
        { url_subtitle && (<img className={'subtitle'} src={ url_subtitle}></img>)}


    </div>
  );
}