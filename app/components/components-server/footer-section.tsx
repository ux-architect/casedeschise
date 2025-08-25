

import { SiteInfoType } from '@/types';
import SocialMediaSection from '../components-ui/social-media-section';
import styles from './footer-section.module.scss';
import Link from 'next/link';
import { getGeneralInfo } from '@/sanity/sanity.query';


export default async function FooterSection({ page = 'sibiu' }: { page: string; }) {

const linkPrefix = "/" + page ;
const generalInfo: SiteInfoType = await getGeneralInfo();

  return (
    <div  className={`${styles['namespace-container']} clearfix`}>
          <section id="contact" className = {`${'footer-section'} clearfix`}>
            
            <div className="col col-1">
                <div>{generalInfo?.contactFields?.address}</div>
                <div>{generalInfo?.contactFields?.contactEmail}</div>
                <div>{generalInfo?.contactFields?.contactPhone}</div>
                <SocialMediaSection city={page} generalInfo={generalInfo} className='in-footer dang'></SocialMediaSection>
            </div>

            <div className="col col-2">
              <Link href={`${linkPrefix}#despre`} className="link diff-sibiu-valcea diff-hover">Despre</Link>
              <Link href={`${linkPrefix}#sponsori`} className="link diff-sibiu-valcea diff-hover">Comunitate</Link>
              <Link href={`${linkPrefix}#despre`} className="link diff-sibiu-valcea diff-hover">Arhiva</Link>
              <Link href={`${linkPrefix}#despre`} className="link diff-sibiu-valcea diff-hover">FAQ</Link>
            </div>

            <div className="col col-2">
              <Link href={`${linkPrefix}#harta`} className="link diff-sibiu-valcea diff-hover">Harta</Link>
              <Link href={`${linkPrefix}#obiective`} className="link diff-sibiu-valcea diff-hover">Cladiri</Link>
              <Link href={`${linkPrefix}#tururi`} className="link diff-sibiu-valcea diff-hover">Tururi</Link>
              <Link href={`${linkPrefix}#evenimente`} className="link diff-sibiu-valcea diff-hover">Evenimente</Link>
            </div>

            

          </section>
    </div>
  );
}