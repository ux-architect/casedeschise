import { getFaqList } from "@/sanity/sanity.query";
import { FaqType } from "@/types";
import styles from './page.module.scss';
import Image from "next/image";


export default async function Faq({ params}: {params: Promise<{ year:string, "sibiu-valcea": string }>;}) {
 const { ["sibiu-valcea"]: city }= await params;

  const faqList : FaqType[] = await getFaqList();

  return(
    <main className={`${styles['namespace-container']} `} >
      <div className="cover-image">
        <Image src="/images/faq-image.jpg" className="object-cover" fill priority data-wait-for-image sizes="(max-width: 768px) 70vw, 100vw" alt="cover"/>
      </div>

      {faqList?.map((item, idx) => (
              <div key={idx}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
                <small>{item.city}</small>
              </div>
            ))}
          
    </main>
    )

}