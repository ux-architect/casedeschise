

import styles from './mission-section.module.scss';
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";

import { PortableText } from 'next-sanity';
import { urlFor } from '@/sanity/sanity.client';


export default async function MissionSection({className = '', page = 'sibiu'}: {className?: string, page: string; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();


  const maskUrl = generalInfo?.currentYearImage?.image ? urlFor(generalInfo?.currentYearImage?.image ).width(500).url() : "";
  return (
    <div  className={`${styles['namespace-container']} ${className} clearfix`}>

          <section id="despre" className={'mission-section'}>
            <div className="col col-2 hide-on-desktop"><div className='masked-container h-100 w-100 diff-sibiu-valcea diff-background' style={{ "--mask-url": `url(${maskUrl})` } as React.CSSProperties}></div></div>
            <div className="col col-1 has-portable-text p-line-height-20"><PortableText value={generalInfo?.misionStatement1} /></div>
            <div className="col col-2 hide-on-mobile"><div className='masked-container  h-100 w-100 diff-sibiu-valcea diff-background' style={{ "--mask-url": `url(${maskUrl})` } as React.CSSProperties}></div></div>
            <div className="col col-3 has-portable-text p-line-height-20"><PortableText value={generalInfo?.misionStatement2} /></div>
        </section>
    </div>
  );
}