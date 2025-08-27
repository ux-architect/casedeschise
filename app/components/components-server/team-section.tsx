

import styles from './team-section.module.scss';
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";
import { urlFor } from '@/sanity/sanity.client';

export default async function TeamSection({ page = 'sibiu', className = '', id = '' }: { page: string, className?: string, id?:string }) {

  const generalInfo: SiteInfoType = await getGeneralInfo();
  const countTeam = generalInfo?.team?.length;
  const cssClass_teamSize = countTeam > 8 ? "size-9-12" : "size-5-8";
  
  return (

      <div id={id} className={`${styles['namespace-container']} clearfix` }>

          <div  className={`team-section-container clearfix ${cssClass_teamSize} ${className}`}>

            <div className='col col-title'>
                <div className='hide-on-desktop font-safiro diff-sibiu-valcea'>
                  <span className="row-1">ECH</span><br/><span className="row-2">IPA</span>
                </div>
              <div className='masked-container h-100 w-100 diff-sibiu-valcea diff-background' style={{ "--mask-url": `url(${"/images/EC-HI-PA.png"})` } as React.CSSProperties}></div>
            </div>

            <div className='col col-members clearfix'>
                {generalInfo?.team?.map((member, idx) => {
                  const hasImage : boolean = member.image ? true : false;
                  const imgSource : string = hasImage ? member.image : "/images/member-placeholder.jpg";
                  const cssClass = hasImage ? "" : "placeholder";
                  return (
                    <div key={idx} className='member'>
                      <img src={imgSource} className={`portrait ${cssClass}`} alt={`${member.name} portrait`}/>
                      <div className='name'>{member.name}</div>
                      <div className='role'>{member.role}</div>
                    </div>
                  );
                  
                })}
            </div>

        </div>
        
    </div>
    
  );
}