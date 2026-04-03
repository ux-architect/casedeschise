import Image from "next/image";
import { SignupFormProjectType } from "@/types";
import './project-card.scss';

export default function ProjectCard({ project, className = '' }: { project: SignupFormProjectType; className?: string;}) {
  return (
    <label className={`project float-left diff-sibiu-valcea diff-background cursor-pointer ${className}`.trim()}>
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
        <span className="float-left">
          {(() => {
            const infoParts = (project.info || '').split('///').map((part) => part.trim()).filter(Boolean);

            return infoParts.map((part, idx) => (
              <span key={idx}> {part} {idx < infoParts.length - 1 && <br/>} </span>
            ));
          })()}
        </span>
        </div>
    </label>
  );
}
