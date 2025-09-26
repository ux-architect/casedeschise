

import styles from './team-section.module.scss';
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";
import Image from "next/image";
import Link from 'next/link';

export default async function TeamSection({ page = 'sibiu', className = '', id = '' }: { page: string, className?: string, id?:string }) {

  const generalInfo: SiteInfoType = await getGeneralInfo();

  const members = generalInfo?.team?.filter((m) => m?.city === page || m?.city === "sibiu-valcea");
  const countTeam = members.length;
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
                {members.map((member, idx) => {
                  const hasImage : boolean = member.image ? true : false;
                  const imgSource : string = hasImage ? member.image : "/images/member-placeholder.jpg";
                  const cssClass = hasImage ? "" : "placeholder";
                  const webStudio = member.role.toLowerCase().includes("web");
                  
                  if(webStudio){
                      return (
                      <Link href="https://index-five-bice.vercel.app/" target="_blank" key={idx} className='member'>
                          <div className="member-image"><Image src={`${imgSource}`} className={`portrait object-cover ${cssClass}`}  loading="lazy" fill sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, 20vw" alt=""/></div>
                          <div className='name'>{member.name}</div>
                          <div className='role web-studio text-underline'>web studio</div>
                      </Link>)
                  }
                  else{
                       return (
                      <div key={idx} className='member'>
                          <div className="member-image"><Image src={`${imgSource}`} className={`portrait object-cover ${cssClass}`}  loading="lazy" fill sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, 20vw" alt=""/></div>
                          <div className='name'>{member.name}</div>
                          <div className='role'>{member.role}</div>
                      </div>)

                  }
                  
                })}
            </div>

        </div>
        
    </div>
    
  );
}