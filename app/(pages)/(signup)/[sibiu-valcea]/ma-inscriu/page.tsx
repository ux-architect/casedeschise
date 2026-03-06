import './page.scss';
import SignupForm from "@/app/(pages)/(signup)/[sibiu-valcea]/ma-inscriu/signup-form";
import { CityKey } from '@/types';
import { getSignupForm } from '@/sanity/sanity.query';
import Image from "next/image";


export default async function Signup({ params}: {params: Promise<{ "sibiu-valcea": string }>;}) {
 const { ["sibiu-valcea"]: city } = await params;
 const selectedCity: CityKey = city === 'valcea' ? 'valcea' : 'sibiu'
 const formSetup = await getSignupForm("signup-form-" + selectedCity)

  return(
    <main className={`nsc--page-signup`} data-no-highlight-on-nav>
      <div className="cover">
              <div className="cover-image">
                <Image src="/images/faq-image.jpg" className="object-cover" fill priority data-wait-for-image sizes="(max-width: 768px) 70vw, 100vw" alt="cover"/>
              </div>
              <div className="page-title font-safiro diff-sibiu-valcea">FAQ</div>
            </div>

      <SignupForm formSetup={formSetup} />
    </main>
    )

}