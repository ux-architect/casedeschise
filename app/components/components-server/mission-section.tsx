

import styles from './mission-section.module.scss';
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";
import Image from "next/image";
import { PortableText } from 'next-sanity';


export default async function MissionSection({ page = 'sibiu' }: { page: string; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
  const imgUrl: string = page == "sibiu" ? "/images/misiune-sb.png" : "/images/misiune-vl.png";
  return (
    <div  className={`${styles['namespace-container']} `}>
          <section id="despre" className={'mission-section'}>

            <div className="col col-1"><PortableText value={generalInfo?.misionStatement1} /></div>
            <div className="col col-2"><Image src={imgUrl} className="object-fit" fill style={{ objectFit: "contain" }} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="cover"/></div>
            <div className="col col-3 has-portable-text"><PortableText value={generalInfo?.misionStatement2} /></div>

            
        </section>
    </div>
  );
}