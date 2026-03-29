import { PortableText } from '@portabletext/react';
import { SignupFormOptionalItems, SignupFormProjectType } from '@/types';
import { PortableTextBlock } from 'sanity';
import ProjectCard from './project-card';
import './form-section.scss';

interface FormSectionProps {
  className: string; title?: string; subtitle?: PortableTextBlock[]; projects?: SignupFormProjectType[]; optionalItems?: SignupFormOptionalItems;
}

export default function FormSection({ className, title, subtitle, projects, optionalItems }: FormSectionProps) {
  
    if (!projects || projects.length === 0) {return null;}

  return (
    <section className={`${className} project-section position-relative float-left`}>
      <h6 className="diff-sibiu-valcea">{title}</h6>
      {subtitle && subtitle.length > 0 && (<div className="project-section-subtitle"> <PortableText value={subtitle} /></div>)}

      <div className="projects-flex-container">
        {projects.map((project, idx) => ( <ProjectCard key={idx} project={project} />))}
      </div>

      {optionalItems?.texts && optionalItems.texts.length > 0 && (
        <div className="optional-texts float-left">
          {optionalItems.texts.map((item, idx) => (
            item.text && item.text.length > 0 && (
              <div key={idx} className="optional-text"><PortableText value={item.text} /></div>
            )
          ))}
        </div>
      )}

      {optionalItems?.checkboxes && optionalItems.checkboxes.length > 0 && (
        <div className="optional-checkboxes float-left">
          {optionalItems.checkboxes.map((item, idx) => (
            item.text && (
              <label key={idx} className="optional-checkbox cursor-pointer">
                  <input type="checkbox" name="optionalItems" value={item.text} />
                <span>{item.text}</span>
              </label>
            )
          ))}
        </div>
      )}

      <div className="border-highlight diff-sibiu-valcea diff-background"></div>
    </section>
  );
}
