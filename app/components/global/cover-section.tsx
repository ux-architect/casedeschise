

import styles from './cover-section.module.scss';
import Image from "next/image";
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";

export default async function CoverSection({ page = 'sibiu' }: { page: string; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
 let url_cover, url_title, url_subtitle;
  
  if(page == "sibiu"){
    url_cover = generalInfo.coverSibiu?.[0]?.image;
    url_title = generalInfo.coverSibiu?.[1]?.image;
    url_subtitle = generalInfo.coverSibiu?.[2]?.image;
  }
if(page == "valcea"){
    url_cover = generalInfo.coverValcea?.[0]?.image;
    url_title = generalInfo.coverValcea?.[1]?.image;
    url_subtitle = generalInfo.coverValcea?.[2]?.image;
  }

  return (

    <div
        className={`${styles['cover-section']} cover-image overlay`}
        style={{ backgroundImage: url_cover ? `url(${url_cover})` : undefined }}
        >


        <img
          className={`${styles['title']}`}
          src={ url_title }
        ></img>

        <img
          className={`${styles['subtitle']}`}
          src={ url_subtitle }
        ></img>


          {/* <Image
              src={generalInfo.coverSibiu?.[1]?.image}
              className="object-cover"
              alt="cover-image"
              
            />
            <Image
              src={generalInfo.coverSibiu?.[2]?.image}
              className="object-cover"
              alt="cover-image"
              
            /> */}
    </div>
  );
}