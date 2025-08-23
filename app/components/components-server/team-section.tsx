

import styles from './team-section.module.scss';
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";
import Image from "next/image";

export default async function TeamSection({ page = 'sibiu' }: { page: string; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
  const titleUrl: string = page == "sibiu" ? "/images/EC-HI-PA-verde.png" : "/images/EC-HI-PA-roz.png";
  const countTeam = generalInfo?.team?.length;
  const cssClass_teamSize = countTeam > 8 ? "size-9-12" : "size-5-8";
  
  return (

      <div className={`${styles['namespace-container']} ${styles[cssClass_teamSize]} clearfix` }>


        <div className='col col-title'>
          <div className='hide-on-desktop font-safiro diff-sibiu-valcea'>
            <span className="row-1">ECH</span>
            <br className="hide-before-480"/>
            <span className="row-2">IPA</span>
            </div>
          <Image src={titleUrl} className="object-fit hide-on-mobile" fill style={{ objectFit: "contain" }} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="echipa"/>
        </div>
        <div className='col col-members'>
            {generalInfo?.team?.map((member, idx) => {
              const hasImage : boolean = member.image ? true : false;
              const imgSource : string = hasImage ? member.image : "/images/member-placeholder.jpg";
              const cssClass = hasImage ? "" : "placeholder";
              return (
                <div key={idx} className='member'>
                  <img
                    src={imgSource}
                    className={`portrait ${cssClass}`}
                    alt={`${member.name} portrait`}
                  />
                  <div className='name'>{member.name}</div>
                  <div className='role'>{member.role}</div>
                </div>
              );
              
            })}
        </div>
        
    </div>
    
  );
}