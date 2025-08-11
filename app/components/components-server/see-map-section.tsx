

import { SiteInfoType } from '@/types';
import styles from './see-map-section.module.scss';
import Image from "next/image";
import Link from 'next/link';
import { getGeneralInfo } from '@/sanity/sanity.query';


export default async function SeeMapSection({ page }: { page: string }) {

const url_harta = `/images/vezi-harta-${page}.jpg`;
const generalInfo: SiteInfoType = await getGeneralInfo();

const linkPrefix = "/" + generalInfo?.currentYear + "/" + page ;

  return (

    <div  className={`${styles['namespace-container']} clearfix`}>

      <section className={`see-map-section clearfix`}>
        <Link href={`${linkPrefix}/map`}>
            <Image src={`${url_harta}`} className="object-cover"  loading="lazy" fill sizes="(max-width: 768px) 75vw, 100vw" alt="sibiu-cover"/>
        </Link>
      </section>

  </div>
  );
}