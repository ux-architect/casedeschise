

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
            <div className="col col-1">
                <Link className='partner large-2' href="https://oar.archi/en/" target="_blank">
                  <div className="logo has-label" data-label="INIȚIATOR">
                    <Image src={'/images/oar-sb-vl-negru.png'} fill alt={`oar sibiu-valcea logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/>
                  </div>
                </Link>
            </div>

            <div className="col col-2">
              <Link className='partner large-1' href="https://www.oarsbvl.ro/" target="_blank">
                <div className="logo has-label" data-label="COFINANȚATOR">
                  <Image src={'/images/oar-negru.png'} fill alt={`oar logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/>
                </div>
              </Link>

              <Link className='partner' href="https://oar.archi/timbrul-de-arhitectura/" target="_blank">
                <div className="logo has-label ml-30" data-label="PRIN">
                  <Image src={'/images/timbrul-negru.png'} fill alt={`timbru de arhitectura logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/>
                </div>
              </Link>

           </div>
          </section>

          <section id="parteneri" className={'partner-section '}><h2>Parteneri</h2>
            {partners.map((partner, idx) => {
              return (
                  <Link href={partner.link || "#"} key={idx} className='partner' target="_blank">
                    <div className="logo"><Image src={partner.logo || "/image-missing.jpg"} fill alt={`${partner.name} logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/></div>
                  </Link>
              );})}

        </section>

        <section id="parteneri-media-mobilitate" className={'partner-section '}>
          {/*  col-1  */}
          <div className="col col-1"><h2>Partener de mobilitate</h2>
              {partnersMobility.map((partner, idx) => { return (
                    <Link href={partner.link || "#"} key={idx} className='partner' target="_blank">
                      <div className="logo"><Image src={partner.logo || "/image-missing.jpg"} fill alt={`${partner.name} logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/></div>
                    </Link>
                );})}
          </div>
           {/*  col-2  */}
          <div className="col col-2"><h2>Parteneri media</h2>
              {partnersMedia.map((partner, idx) => {return (
                  <Link href={partner.link || "#"} key={idx} className='partner' target="_blank">
                      <div className="logo"><Image src={partner.logo || "/image-missing.jpg"} fill alt={`${partner.name} logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/></div>
                  </Link>
                );})}
          </div>
        </section>

        <section id="sponsori" className={'partner-section '}><h2>Sponsori</h2>
            {sponsors.map((partner, idx) => {return (
                  <Link href={partner.link || "#"} key={idx} className='partner' target="_blank">
                    <div className="logo"><Image src={partner.logo || "/image-missing.jpg"} fill alt={`${partner.name} logo`} className={"object-contain"} sizes="(max-width: 768px) 50vw, 25vw"/></div>
                  </Link>
              );})}
        </section>
    </div>
  );
}