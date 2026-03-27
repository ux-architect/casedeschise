import Image from "next/image";
import { SignupFormProjectType } from "@/types";
import './project-card.scss';

interface ProjectCardProps {
  project: SignupFormProjectType;
  className?: string;
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  return (
    <label className={`project float-left diff-sibiu-valcea diff-background ${className}`.trim()}>
      <div className="project-image cursor-pointer">
        <Image unoptimized fill alt={project.name || ''}
          src={project.image || "/should-not-happen.jpg"}
          className="object-cover pointer-events-none"
        />
        <input className="custom-checkbox diff-sibiu-valcea diff-background" type="checkbox" name="options" value={project.code} />
      </div>
      <div className="project-name">{project.name}</div>
      <div className="project-info">
        <span className="svg-icon svg-icon-clock float-left"></span>
        <span className="float-left">{project.info}</span>
        </div>
    </label>
  );
}
