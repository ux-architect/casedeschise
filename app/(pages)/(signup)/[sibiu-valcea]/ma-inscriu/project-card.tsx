import Image from "next/image";
import { SignupFormProjectType } from "@/types";
import './project-card.scss';

export default function ProjectCard({ project, className = '' }: { project: SignupFormProjectType; className?: string;}) {
  
  const cssClass_longName = project.name && project.name.length > 20 ? 'project-has-long-name' : '';
  const cssClass_longAddress = project.address && project.address.length > 35 ? 'project-has-long-address' : '';
  const cssClass_soldOut = project.soldOut ? 'sold-out' : '';

  return (
    <label className={`project float-left  ${cssClass_soldOut} ${className}`.trim()}>
      <div className="project-contents diff-sibiu-valcea diff-background">
        <div className={`project-image`}>
          <Image unoptimized fill alt={project.name || ''}  src={project.image || "/should-not-happen.jpg"} className="object-cover pointer-events-none" />
          <input className="checkbox-input custom-checkbox diff-sibiu-valcea diff-background" type="checkbox" name="options" value={project.code} />
        </div>

        <div className={`project-name ${cssClass_longName}`}>{project.name}</div>
        {project.subtitle?.trim() && <div className="project-subtitle hide-long-text" title={project.subtitle}>{project.subtitle}</div>}

  
        {project.address?.trim() && <div className={`project-address ${cssClass_longAddress}`}>
            <span className="svg-icon svg-icon-location-pin float-left"></span>
            <span className="float-left">{project.address}</span>
          </div>
        }

        <div className={`project-info ${cssClass_longAddress}`}>
          <span className="svg-icon svg-icon-clock float-left"></span>
          <span className="float-left">{project.info}</span>
        </div>
      </div>  
      {project.soldOut && <span className="sold-out-label diff-sibiu-valcea diff-background">LOCURI OCUPATE</span>}
        
    </label>
  );
}
