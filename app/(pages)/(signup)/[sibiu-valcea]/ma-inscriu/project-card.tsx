import Image from "next/image";
import { SignupFormProjectType } from "@/types";
import './project-card.scss';

export default function ProjectCard({ project, className = '' }: { project: SignupFormProjectType; className?: string;}) {
  
  const cssClass_longName = project.name && project.name.length > 20 ? 'project-has-long-name' : '';
  const cssClass_longAddress = project.address && project.address.length > 35 ? 'project-has-long-address' : '';

  return (
    <label className={`project float-left diff-sibiu-valcea diff-background cursor-pointer ${className}`.trim()}>
      <div className="project-image cursor-pointer">
        <Image unoptimized fill alt={project.name || ''}
          src={project.image || "/should-not-happen.jpg"}
          className="object-cover pointer-events-none"
        />
        <input className="custom-checkbox diff-sibiu-valcea diff-background" type="checkbox" name="options" value={project.code} />
      </div>

      <div className={`project-name ${cssClass_longName}`}>{project.name}</div>


      {project.address?.trim() && <div className={`project-address ${cssClass_longAddress}`}>
          <span className="svg-icon svg-icon-location-pin float-left"></span>
          <span className="float-left">{project.address}</span>
        </div>
      }

      <div className={`project-info ${cssClass_longAddress}`}>
        <span className="svg-icon svg-icon-clock float-left"></span>
        <span className="float-left">{project.info}</span>
      </div>

    </label>
  );
}
