

import styles from './partner-section.module.scss';
import { SiteInfoType } from "@/types";
import Image from "next/image";
import Link from 'next/link';
import { getGeneralInfo } from '@/sanity/sanity.query';


export default async function PartnerSection({ page = 'sibiu' }: { page: string; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();

  const partners = generalInfo?.partners?.filter((p: { type: string; }) => p.type === "partner");
  const partnersMobility = generalInfo?.partners?.filter((p: { type: string; }) => p.type === "mobility-partner");
  const partnersMedia = generalInfo?.partners?.filter((p: { type: string; }) => p.type === "media-partner");
  const sponsors = generalInfo?.partners?.filter((p: { type: string; }) => p.type === "sponsor");
  return (
    <div className={`${styles['namespace-container']} diff-sibiu-valcea diff-background`}>
          
          <section id="initiator" className={'partner-section '}>
            <div className="size-container clearfix">
                <Link className='partner-oar' href="https://www.oarsbvl.ro/" target="_blank">
                  <div className="logo has-label" data-label="INIȚIATOR">
                    <Image src={'/images/oar-negru.png'} fill alt={`oar logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/>
                  </div>
                </Link>

              <Link className='partner-oar' href="https://oar.archi/en/" target="_blank">
                  <div className="logo has-label" data-label="COFINANȚATOR">
                    <Image src={'/images/oar-sb-vl-negru.png'} fill alt={`oar sibiu-valcea logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/>
                  </div>
                </Link>

              <Link className='partner-oar' href="https://oar.archi/timbrul-de-arhitectura/" target="_blank">
                <div className="logo has-label" data-label="PRIN">
                  <Image src={'/images/timbru-negru.png'} fill alt={`timbru de arhitectura logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/>
                </div>
              </Link>

           </div>
          </section>

          <section id="parteneri" className={'partner-section '}><h2>Parteneri</h2>
            <div className="size-container clearfix">
              {partners.map((partner, idx) => {

                const logoRatio = Number(partner.logoWidth) / Number(partner.logoHeight);
                return (
                    <Link href={partner.link || "#"} key={idx} className='partner' target="_blank">
                      <div className="logo" style={{ aspectRatio: `${logoRatio}` }} data-h={partner.logoHeight} data-w={partner.logoWidth} data-ratio={logoRatio}><Image src={partner.logo || "/image-missing.jpg"} fill alt={`${partner.name} logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/></div>
                    </Link>
                );})}
          </div>  
        </section>

        {partnersMobility.length != 0 || partnersMedia.length != 0 && (

          <section id="parteneri-media-mobilitate" className={'partner-section '}>

            <div className="col col-1"><h2>Partener de mobilitate</h2>
                {partnersMobility.map((partner, idx) => { return (
                      <Link href={partner.link || "#"} key={idx} className='partner' target="_blank">
                        <div className="logo"><Image src={partner.logo || "/image-missing.jpg"} fill alt={`${partner.name} logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/></div>
                      </Link>
                  );})}
            </div>

            <div className="col col-2"><h2>Parteneri media</h2>
                {partnersMedia.map((partner, idx) => {return (
                    <Link href={partner.link || "#"} key={idx} className='partner' target="_blank">
                        <div className="logo"><Image src={partner.logo || "/image-missing.jpg"} fill alt={`${partner.name} logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/></div>
                    </Link>
                  );})}
            </div>
          </section>
      )}


        {sponsors && sponsors.length > 0 && (
        <section id="sponsori" className={'partner-section '}><h2>Sponsori</h2>
            {sponsors.map((partner, idx) => {return (
                  <Link href={partner.link || "#"} key={idx} className='partner' target="_blank">
                    <div className="logo"><Image src={partner.logo || "/image-missing.jpg"} fill alt={`${partner.name} logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/></div>
                  </Link>
              );})}
        </section>)}
        
    </div>
  );
}