import { getFaqList } from "@/sanity/sanity.query";
import { FaqType } from "@/types";
import './page.scss';
import Image from "next/image";
import ExpandSection from "@/app/components/components-ui/expand-section";
import PartnerSection from "@/app/components/components-server/partner-section";
import FooterSection from "@/app/components/components-server/footer-section";
import Link from "next/link";



export default async function Faq({ params}: {params: Promise<{ year:string, "sibiu-valcea": string }>;}) {
 const { ["sibiu-valcea"]: city }= await params;
  const url_logo = `/images/case-${city}-negru.png`;
  
  const faqList : FaqType[] = await getFaqList();

  return(
    <main className={`nsc--page-faq`} data-no-highlight-on-nav>

      <div className="cover">
        <div className="cover-image inner-shadow-top inner-shadow-top-size-50 inner-shadow-top-value-10">
          <Image src="/images/faq-image.jpg" className="object-cover" fill priority data-wait-for-image sizes="(max-width: 768px) 70vw, 100vw" alt="cover"/>
        </div>
        <div className="page-title font-safiro diff-sibiu-valcea">FAQ</div>
        <Link href="/" className={`logo-black hide-while-still-loading` }><Image src={`${url_logo}`} className="object-contain" fill priority unoptimized sizes="(max-width: 768px) 100vw, 33vw" alt="cover"/></Link>
      </div>
      

      <div className="layout-container clearfix">
          {faqList?.map((item, idx) => (

                <ExpandSection key={idx}>
                    <h3 className="question">{item.question}</h3>
                    <span className="answer">{item.answer}</span>
                </ExpandSection>

            ))}
      </div>

      <PartnerSection page={city} />
      <FooterSection city={city}/>
          
    </main>
    )

}