

import { SiteInfoType } from '@/types';
import styles from './see-map-section.module.scss';
import Image from "next/image";
import Link from 'next/link';
import { getGeneralInfo } from '@/sanity/sanity.query';


export default async function SeeMapSection({ page, className = "" }: { page: string, className? : string }) {

const url_harta = `/images/harta-${page}.jpg`;
const generalInfo: SiteInfoType = await getGeneralInfo();

const linkPrefix = "/" + generalInfo?.currentYear + "/" + page ;

  return (

    <div  className={`${styles['namespace-container']} clearfix ${className}`}>

      <section className={`see-map-section clearfix`}>
        <Link href={`${linkPrefix}/map`} className="fill-container">
            <h6 className='font-safiro'>Vezi<br/>harta</h6>
            <div className="go-button clearfix"><span className="svg-icon svg-icon-arrow fl"></span></div>
            <Image src={`${url_harta}`} className="object-cover"  loading="lazy" fill sizes="100vw" alt="sibiu-cover"/>
        </Link>      
      </section>

  </div>
  );
}