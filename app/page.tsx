

import { urlFor } from "@/sanity/sanity.client";
import { getGeneralInfo} from "@/sanity/sanity.query";
import type { SiteInfoType } from "@/types";
import styles from './page.module.scss';
import Link from "next/link";
import Image from "next/image";
import DownloadLink from "./components/components-ui/download-link";

export default async function Home() {

  const generalInfo: SiteInfoType = await getGeneralInfo();
  let url_cover_sibiu = generalInfo?.siteEntryCover?.sibiu?.url ? urlFor(generalInfo?.siteEntryCover?.sibiu.url).width(960).height(1080).auto('format').quality(99): null;
  let url_cover_valcea = generalInfo?.siteEntryCover?.valcea?.url ? urlFor(generalInfo?.siteEntryCover?.valcea?.url ).width(960).height(1080).auto('format').quality(99) : null;

  return (
    <div className = {`${styles['namespace-container']} clearfix hide-while-still-loading`}>

        <div className="section section-logos hide-on-desktop"  aria-label={'Sibiu'}>
            <div className="logos clearfix ">
              <Link href="https://www.oarsbvl.ro/" className="float-left position-relative"><div className="oar has-label" style={{ backgroundImage: `url(/images/oar.png)` }} data-label="INIȚIATOR:"></div></Link>
              <Link href="https://oar.archi/en/" className="float-left position-relative"><div className="oar has-label" style={{ backgroundImage: `url(/images/oarr.png)` }} data-label="COFINANȚATOR:"></div></Link>
              <Link href="https://oar.archi/timbrul-de-arhitectura/" className="float-left position-relative"><div className="timbru has-label" style={{ backgroundImage: `url(/images/timbru.png)` }} data-label="PRIN:"></div></Link>
            </div>
        </div>

        {/* SIBIU */}
        <div className="section  section-sibiu"  aria-label={'Sibiu'}>

            <div className="w-100 h-100 position-absolute inner-shadow-top-disabled inner-shadow-top-size-50 inner-shadow-top-value-50" style={{ top:0 }}>
                <Image src={`${url_cover_sibiu}`} className="object-cover " data-wait-for-image fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw" alt="sibiu-cover"/>
            </div>

            <a className="btn btn-primary clearfix" href={`/sibiu`} > Vezi mai multe
            {/* <span className="svg-icon svg-icon-arrow fl"></span> */}
            </a>

            <div className="logos clearfix hide-on-mobile">
              <Link href="https://www.oarsbvl.ro/" className="float-left" target="_blank"><div className="oar has-label" style={{ backgroundImage: `url(/images/oar.png)` }} data-label="INIȚIATOR:"></div></Link>
            </div>
            
            <Link href={`/sibiu`} className="title" style={{ backgroundImage: `url(/images/case-sibiu.png)` }}></Link>
          
            
         
        </div>

        {/* VALCEA */}
        <div className="section section-valcea" aria-label={'Valcea'}>
          <div className="logos clearfix hide-on-mobile">
            <Link href="https://oar.archi/" target="_blank"><div className="oar has-label" style={{ backgroundImage: `url(/images/oarr.png)` }} data-label="COFINANȚATOR:"></div></Link>
            <Link href="https://oar.archi/timbrul-de-arhitectura/" target="_blank"><div className="timbru has-label" style={{ backgroundImage: `url(/images/timbru.png)` }} data-label="PRIN:"></div></Link>
          </div>
          <Link href={`/valcea`} className="title" style={{ backgroundImage: `url(/images/case-valcea.png)` }}></Link>
          
          <Image src={`${url_cover_valcea}`} className="object-cover" data-wait-for-image fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" alt="valcea-cover" />
          <a className="btn btn-primary clearfix" href={`/valcea`}> Vezi mai multe
          {/* <span className="svg-icon svg-icon-arrow fl"></span> */}
          </a>

          
          
        </div>

      </div>
  );
}