import { urlFor } from "@/sanity/sanity.client";
import { getGeneralInfo} from "@/sanity/sanity.query";
import type { SiteInfoType } from "@/types";
import styles from './page.module.scss';
import Link from "next/link";
import Image from "next/image";

export default async function Home() {

  const generalInfo: SiteInfoType = await getGeneralInfo();
  let url_cover_sibiu = generalInfo?.siteEntryCover?.sibiu?.url ? urlFor(generalInfo?.siteEntryCover?.sibiu.url).width(960).height(1080).auto('format').quality(99): null;
  let url_cover_valcea = generalInfo?.siteEntryCover?.valcea?.url ? urlFor(generalInfo?.siteEntryCover?.valcea?.url ).width(960).height(1080).auto('format').quality(99) : null;

  return (
     <div className = {styles['cover-main']}>

        <div className="section"  aria-label={'Sibiu'}>
          <div className="logos clearfix"><Link href="https://www.oarsbvl.ro/"><div className="oar has-label" style={{ backgroundImage: `url(/images/oar.png)` }} data-label="INIȚIATOR:"></div></Link></div>
          <Link href={`/${generalInfo.currentYear}/sibiu`}><div className="title" style={{ backgroundImage: `url(/images/case-sibiu.png)` }}></div></Link>
          <Image src={`${url_cover_sibiu}`} className="object-cover" fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw" alt="sibiu-cover"/>
        </div>


        <div className="section" aria-label={'Valcea'}>
          <div className="logos clearfix">
            <Link href="https://oar.archi/en/"><div className="oar has-label" style={{ backgroundImage: `url(/images/oarr.png)` }} data-label="COFINANȚATOR:"></div></Link>
            <Link href="https://oar.archi/timbrul-de-arhitectura/"><div className="timbru has-label" style={{ backgroundImage: `url(/images/timbru.png)` }} data-label="PRIN:"></div></Link>
          </div>
          <Link href={`/${generalInfo.currentYear}/valcea`}><div className="title" style={{ backgroundImage: `url(/images/case-valcea.png)` }}></div></Link>
          <Image src={`${url_cover_valcea}`} className="object-cover" fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" alt="valcea-cover" />
        </div>

      </div>
  );
}