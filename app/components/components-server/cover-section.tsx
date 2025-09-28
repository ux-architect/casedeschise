

import styles from './cover-section.module.scss';
import Image from "next/image";
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";
import Link from 'next/link';
import type { CityKey } from "@/types";
import DownloadLink from '../components-ui/download-link';


export default async function CoverSection({ city = 'sibiu' }: { city?: CityKey; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
  let url_cover = generalInfo?.cityPageCover?.[city]?.url || null;
  let url_logo = `/images/case-${city}-color.png`;
  const linkPrefix =  "/" + city ;

  const visitFormExternalUrl = city == "sibiu" ? generalInfo?.externalFormLinks_sibiu?.visitFormExternalUrl || "#" : generalInfo?.externalFormLinks_valcea?.visitFormExternalUrl || "#" ;
  const pdfUrl = city == "sibiu" ? generalInfo?.pdfSibiu?.url || "" : generalInfo?.pdfValcea?.url || "";
  const pdfFileName = city == "sibiu" ? generalInfo?.pdfSibiu?.originalFilename || "" : generalInfo?.pdfValcea?.originalFilename || "";
  
  return (

    <div className={`${styles['cover-section']} overlay`} >
      
        {/* background image */}
        <Image src={`${url_cover}`} className="object-cover" fill priority data-wait-for-image sizes="(max-width: 768px) 70vw, 100vw" alt="cover"/>

        <Link href="/" className={`logo hide-while-still-loading` }><Image src={`${url_logo}`} className="object-contain" fill priority unoptimized sizes="(max-width: 768px) 100vw, 33vw" alt="cover"/></Link>

        <h1 className={'event-title hide-while-still-loading diff-sibiu-valcea text-uppercase font-safiro'}>Case Deschise</h1>
        <h2 className={'event-date hide-while-still-loading diff-sibiu-valcea font-safiro'}>{generalInfo?.eventDate}</h2>
        
        <div id="main-actions" className="w-100 clearfix hide-while-still-loading">

          {pdfUrl &&
            (<DownloadLink className="btn btn-primary btn-large diff-sibiu-valcea prevent-default-highlight" url={ pdfUrl}  filename = { pdfFileName}  data-umami-click={`program ${city} (cover page)`}  >
              <span className="svg-icon svg-icon-pdf-file float-left diff-sibiu-valcea diff-background" style={{ width: "36px" }}></span>
              <span>PROGRAM</span>
            </DownloadLink>)}

          <Link  className="btn btn-primary btn-large diff-sibiu-valcea prevent-default-highlight" href={`${linkPrefix}/map`} scroll={true} rel="noreferrer noopener"  data-umami-click={`harta ${city} (cover page)`}>
            <span className="svg-icon svg-icon-map float-left diff-sibiu-valcea diff-background "></span>
            <span>Hartă</span>
          </Link>
          <Link  className="btn btn-primary btn-large diff-sibiu-valcea prevent-default-highlight" href={visitFormExternalUrl} target="_blank" scroll={true} rel="noreferrer noopener" data-umami-click={`inscriete ${city} (cover page)`}>ÎNSCRIE-TE</Link>
        
        </div>
        
    </div>
  );
}