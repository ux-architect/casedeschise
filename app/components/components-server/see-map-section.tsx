

import styles from './see-map-section.module.scss';
import Image from "next/image";
import Link from 'next/link';


export default async function SeeMapSection({ page }: { page: string }) {

const url_harta = `/images/vezi-harta-${page}.jpg`;



  return (

    <div  className={`${styles['namespace-container']} clearfix`}>

      <section className={`see-map-section clearfix`}>
        <Link href={`/2025/sibiu`}>
            <Image src={`${url_harta}`} className="object-cover"  loading="lazy" fill sizes="(max-width: 768px) 75vw, 100vw" alt="sibiu-cover"/>
        </Link>
      </section>

  </div>
  );
}