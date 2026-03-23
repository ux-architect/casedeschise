import './page.scss';
import SignupForm from "@/app/(pages)/(signup)/[sibiu-valcea]/ma-inscriu/signup-form";
import { CityKey } from '@/types';
import { getSignupForm } from '@/sanity/sanity.query';
import Image from "next/image";
import { notFound } from 'next/navigation';
import Link from 'next/link';


export default async function Signup({ params}: {params: Promise<{ "sibiu-valcea": string }>;}) {


 const { ["sibiu-valcea"]: city } = await params;
 if (city !== "sibiu" && city !== "valcea") { notFound();}
 const url_logo = `/images/case-${city}-negru.png`;
 
 const formSetup = await getSignupForm("signup-form-" + city)

  return(
    <main className={`nsc--page-signup common-page-structure-style-2`} data-no-highlight-on-nav>
      <div className="cover">
        <div className="cover-image overflow-hidden inner-shadow-top inner-shadow-top-size-50 inner-shadow-top-value-50">
          <Image src="/images/formular-image.jpg" className="object-cover" fill priority data-wait-for-image sizes="(max-width: 768px) 70vw, 100vw" alt="cover"/>
        </div>
        <div className="page-title font-safiro diff-sibiu-valcea">FORMULAR<br/>DE ÎNSCRIERE</div>
        <Link href="/" className={`logo-black hide-while-still-loading` }><Image src={`${url_logo}`} className="object-contain" fill priority unoptimized sizes="(max-width: 768px) 100vw, 33vw" alt="cover"/></Link>
      </div>

      <SignupForm formSetup={formSetup} city={city} />
    </main>
    )

}