

import { SiteInfoType } from '@/types';
import SocialMediaSection from '../components-ui/social-media-section';
import styles from './footer-section.module.scss';
import Link from 'next/link';
import { getGeneralInfo } from '@/sanity/sanity.query';
import DownloadLink from '../components-ui/download-link';


export default async function FooterSection({ city = 'sibiu' }: { city: string; }) {

const linkPrefix = "/" + city ;
const generalInfo: SiteInfoType = await getGeneralInfo();

  const address = generalInfo?.contactFields?.find((c) => c?.city?.toLowerCase() === city)?.address || "";
  const contactEmail = generalInfo?.contactFields?.find((c) => c?.city?.toLowerCase() === city)?.contactEmail ||"";
  const contactPhone = generalInfo?.contactFields?.find((c) => c?.city?.toLowerCase() === city)?.contactPhone || "";
  const mediaKit = city == "sibiu" ? generalInfo?.mediaKitSibiu || "#" : generalInfo?.mediaKitValcea || "#" ;


  return (
    <div  className={`${styles['namespace-container']} clearfix`}>
          <section id="contact" className = {`${'footer-section'} clearfix`}>
            
            <div className="col col-1">
                <div>{address}</div>
                <div>{contactEmail}</div>
                <div>{contactPhone}</div>
                <SocialMediaSection city={city} generalInfo={generalInfo} className='in-footer dang'></SocialMediaSection>
            </div>

            <div className="col col-2">
              <Link href={`${linkPrefix}#despre`} className="link diff-sibiu-valcea diff-hover hide-on-mobile">Despre</Link>
              <Link href={`${linkPrefix}/about`} className="link diff-sibiu-valcea diff-hover hide-on-desktop">Despre</Link>
              <Link href={`${linkPrefix}#parteneri`} className="link diff-sibiu-valcea diff-hover">Parteneri</Link>
              {/* <Link href={`${linkPrefix}/arhiva`} className="link diff-sibiu-valcea diff-hover">Arhiva</Link> */}
              <Link href={`${linkPrefix}/faq`} className="link diff-sibiu-valcea diff-hover">FAQ</Link>
              {mediaKit &&(<DownloadLink className="link diff-sibiu-valcea diff-hover" url={ mediaKit.url}  filename = { mediaKit.originalFilename}>Descarcă Media Kit</DownloadLink>)}
            
            </div>

            <div className="col col-2">
              <Link href={`${linkPrefix}/map`} className="link diff-sibiu-valcea diff-hover">Hartă</Link>
              <Link href={`${linkPrefix}#obiective`} className="link diff-sibiu-valcea diff-hover">Obiective</Link>
              <Link href={`${linkPrefix}#tururi`} className="link diff-sibiu-valcea diff-hover">Tururi Ghidate</Link>
              <Link href={`${linkPrefix}#evenimente`} className="link diff-sibiu-valcea diff-hover">Evenimente</Link>
            </div>

            

          </section>
    </div>
  );
}