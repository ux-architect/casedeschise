
import './faq-section.scss';
import Link from 'next/link';

export default async function FaqSection({ city = 'sibiu' }: { city: string; }) {

const linkPrefix = "/" + city ;

  return (
    <div  className={`nsc--faq-section clearfix`}>
          <section id="faq" className = {`${'faq-section'} clearfix`}>
            <Link className="btn btn-primary diff-sibiu-valcea" href={`${linkPrefix}/faq`} scroll={true} rel="noreferrer noopener">Frequently Asked Questions</Link>
          </section>
    </div>
  );
}