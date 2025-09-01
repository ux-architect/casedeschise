
import styles from './see-map-section.module.scss';
import Image from "next/image";
import Link from 'next/link';


export default async function SeeMapSection({ className = "", page, customUrl = ""}: { className? : string , page: string , customUrl?: string }) {

const url_harta = `/images/harta-${page}.jpg`;
let linkPrefix = "/" + page ;

let linkToMap = customUrl && customUrl.trim() !== "" ?  customUrl : linkPrefix+ "/map";

  return (

    <div  className={`${styles['namespace-container']} clearfix ${className}`}>

      <section className={`see-map-section clearfix fill-container hide-on-desktop`}>
            <Image src={`${url_harta}`} className="object-cover"  loading="lazy" fill sizes="100vw" alt="sibiu-cover"/>
            <Link href={linkToMap} className="btn btn-default btn-large hide-on-desktop prevent-default-highlight">Vezi harta</Link>
      </section>

       <section className={`see-map-section clearfix fill-container hide-on-mobile`}>
        <Link href={linkToMap}>
            <Image src={`${url_harta}`} className="object-cover"  loading="lazy" fill sizes="100vw" alt="sibiu-cover"/>
            <h6 className='font-safiro hide-on-mobile'>Vezi<br/>harta</h6>
            <span className="btn btn-default btn-large hide-on-mobile clearfix"><span className="svg-icon svg-icon-arrow fl rotate-180"></span></span>
        </Link>
      </section>

  </div>
  );
}