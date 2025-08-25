import TeamSection from '@/app/components/components-server/team-section';
import styles from './page.module.scss';
import PartnerSection from '@/app/components/components-server/partner-section';
import FooterSection from '@/app/components/components-server/footer-section';


export default async function Team({ params}: {params: Promise<{ "sibiu-valcea": string}>;}) {
  const { ["sibiu-valcea"]: city } = await params;

  return(
    <>
      <TeamSection page={city} className="mobile-version"/>
      <PartnerSection page={city} />
      <FooterSection page={city}/>
    </>
  )

}