import './page.scss';
import Image from "next/image";
import { ContactForm } from "@/app/components/contact-form/contact-form";


export default async function Faq({ params}: {params: Promise<{ year:string, "sibiu-valcea": string }>;}) {
 const { ["sibiu-valcea"]: city }= await params;

  return(
    <main className={`nsc--page-signup`} data-no-highlight-on-nav>
      <ContactForm/>  
    </main>
    )

}