
import './see-map-section.scss';
import Image from "next/image";
import Link from 'next/link';


export default async function SeeMapSection({ className = "", page, customUrl = "", externalMapsUrl = ""}: { className? : string , page: string , customUrl?: string, externalMapsUrl?: string}) {

const url_harta = `/images/harta-${page}.jpg`;
let linkPrefix = "/" + page ;

let linkToMap = customUrl && customUrl.trim() !== "" ?  customUrl : linkPrefix+ "/map";

  return (

    <div  className={`nsc--see-map-section clearfix ${className}`}>

      <section className={`see-map-section clearfix fill-container small-version `}>
            <Image src={`${url_harta}`} className="object-cover"  loading="lazy" fill sizes="100vw" alt="sibiu-cover"/>
            <Link href={linkToMap} className="btn btn-white btn-large prevent-default-highlight" data-umami-click={`vezi-pe-harta ${page} (project-event-tour page)`}>Vezi pe hartă</Link>
            { externalMapsUrl && (<Link className="open-in-google-maps" href={`${externalMapsUrl}`} data-umami-click={`deschide-in-google-maps ${page} (project-event-tour page)`} scroll={true} target="_blank" rel="noreferrer noopener">DESCHIDE ÎN GOOGLE MAPS</Link>)}

      </section>

       <section className={`see-map-section clearfix fill-container large-version`}>
        <Link href={linkToMap} data-umami-click={`vezi-harta ${page} (cover page)`}>
            <Image src={`${url_harta}`} className="object-cover"  loading="lazy" fill sizes="100vw" alt="sibiu-cover"/>
            <h6 className='font-safiro'>Vezi<br/>harta</h6>
            <span className="btn btn-white btn-large clearfix"><span className="svg-icon svg-icon-arrow fl rotate-180"></span></span>
        </Link>
      </section>

  </div>
  );
}