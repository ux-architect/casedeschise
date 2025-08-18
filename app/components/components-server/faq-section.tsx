import { SiteInfoType } from '@/types';
import styles from './faq-section.module.scss';
import Link from 'next/link';
import { getGeneralInfo } from '@/sanity/sanity.query';

export default async function FaqSection({ city = 'sibiu' }: { city: string; }) {

const generalInfo: SiteInfoType = await getGeneralInfo();

const linkPrefix = "/" + generalInfo?.currentYear + "/" + city ;

  return (
    <div  className={`${styles['namespace-container']} clearfix`}>
          <section id="faq" className = {`${'faq-section'} clearfix`}>
            <Link className="btn btn-primary diff-sibiu-valcea" href={`/faq/${city}`} scroll={true} rel="noreferrer noopener">Frequently Asked Questions</Link>
          </section>
    </div>
  );
}