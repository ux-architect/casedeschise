
import styles from './see-map-section.module.scss';
import Image from "next/image";
import Link from 'next/link';


export default async function SeeMapSection({ className = "", page, customUrl = "", externalMapsUrl = ""}: { className? : string , page: string , customUrl?: string, externalMapsUrl?: string}) {

const url_harta = `/images/harta-${page}.jpg`;
let linkPrefix = "/" + page ;

let linkToMap = customUrl && customUrl.trim() !== "" ?  customUrl : linkPrefix+ "/map";

  return (

    <div  className={`${styles['namespace-container']} clearfix ${className}`}>

      <section className={`see-map-section clearfix fill-container small-version `}>
            <Image src={`${url_harta}`} className="object-cover"  loading="lazy" fill sizes="100vw" alt="sibiu-cover"/>
            <Link href={linkToMap} className="btn btn-white btn-large prevent-default-highlight">Vezi pe hartă</Link>
            { externalMapsUrl && (<Link className="open-in-google-maps" href={`${externalMapsUrl}`} scroll={true} target="_blank" rel="noreferrer noopener">DESCHIDE ÎN GOOGLE MAPS</Link>)}

      </section>

       <section className={`see-map-section clearfix fill-container large-version`}>
        <Link href={linkToMap}>
            <Image src={`${url_harta}`} className="object-cover"  loading="lazy" fill sizes="100vw" alt="sibiu-cover"/>
            <h6 className='font-safiro'>Vezi<br/>harta</h6>
            <span className="btn btn-white btn-large clearfix"><span className="svg-icon svg-icon-arrow fl rotate-180"></span></span>
        </Link>
      </section>

  </div>
  );
}