import { getFaqList } from "@/sanity/sanity.query";
import { FaqType } from "@/types";
import styles from './page.module.scss';
import Image from "next/image";
import ExpandSection from "@/app/components/components-ui/expand-section";
import PartnerSection from "@/app/components/components-server/partner-section";
import FooterSection from "@/app/components/components-server/footer-section";
import { ContactForm } from "@/app/components/contact-form/contact-form";


export default async function Faq({ params}: {params: Promise<{ year:string, "sibiu-valcea": string }>;}) {
 const { ["sibiu-valcea"]: city }= await params;

  const faqList : FaqType[] = await getFaqList();

  return(
    <main className={`${styles['namespace-container']} `} >
      <div className="cover-image">
        <Image src="/images/faq-image.jpg" className="object-cover" fill priority data-wait-for-image sizes="(max-width: 768px) 70vw, 100vw" alt="cover"/>
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