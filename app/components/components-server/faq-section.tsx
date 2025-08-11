

import styles from './faq-section.module.scss';
import Link from 'next/link';


export default async function FaqSection({ page = 'sibiu' }: { page: string; }) {

  return (
    <div  className={`${styles['namespace-container']} clearfix`}>
          <section id="faq" className = {`${'faq-section'} clearfix`}>
            <Link className="btn btn-primary diff-sibiu-valcea" href={`/faq`} scroll={true} rel="noreferrer noopener">Frequently Asked Questions</Link>
          </section>
    </div>
  );
}