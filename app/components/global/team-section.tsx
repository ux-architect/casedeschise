

import styles from './team-section.module.scss';
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";

export default async function TeamSection({ page = 'sibiu' }: { page: string; }) {
  const generalInfo: SiteInfoType = await getGeneralInfo();
  const coverUrl: string = page == "sibiu" ? "/images/EC-HI-PA-verde.png" : "/images/EC-HI-PA-roz.png";
  return (

      <div className={styles['team-section']}>

        <img className='title' src={coverUrl}/>

        {generalInfo.team.map((member, idx) => {
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
    
  );
}