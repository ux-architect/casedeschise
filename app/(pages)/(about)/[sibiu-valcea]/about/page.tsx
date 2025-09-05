import PartnerSection from '@/app/components/components-server/partner-section';
import styles from './page.module.scss';

import MissionSection from "@/app/components/components-server/mission-section";
import FooterSection from '@/app/components/components-server/footer-section';


export default async function About({ params}: {params: Promise<{ "sibiu-valcea": string}>;}) {
  const { ["sibiu-valcea"]: city } = await params;

  return(
    
       <>
          <MissionSection page={city}></MissionSection>
          <PartnerSection page={city} />
          <FooterSection city={city}/>
        </>
  )

}