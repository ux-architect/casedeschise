"use client";

import { ChangeEvent, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { SignupFormOptionalItems, SignupFormProjectType } from '@/types';
import { PortableTextBlock } from 'sanity';
import ProjectCard from './project-card';
import './form-section.scss';

interface FormSectionProps {
  className: string; title?: string; subtitle?: PortableTextBlock[]; projects?: SignupFormProjectType[]; optionalItems?: SignupFormOptionalItems;
}

export default function FormSection({ className, title, subtitle, projects, optionalItems }: FormSectionProps) {
  const [hasCheckedProject, setHasCheckedProject] = useState(false);
  const cssClass_sectionActive = hasCheckedProject? '' : 'section-disabled';

  if (!projects || projects.length === 0) {return null;}

  const handleSectionChange = (event: ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.tagName !== 'INPUT' || target.name !== 'options' || target.type !== 'checkbox') {
      return;
    }

    const sectionElement = event.currentTarget as HTMLElement;
    const anyProjectChecked = sectionElement.querySelector<HTMLInputElement>('input[name="options"]:checked') !== null;
    setHasCheckedProject(anyProjectChecked);

    if (!anyProjectChecked) {
      const optionalCheckboxes = sectionElement.querySelectorAll<HTMLInputElement>('input[name="optionalItems"]');
      optionalCheckboxes.forEach((checkbox) => {checkbox.checked = false;});
    }

    
  };

  

  return (
    <section className={`${className} project-section position-relative float-left`} onChange={handleSectionChange}>
      <h6 className="diff-sibiu-valcea">{title}</h6>
      {subtitle && subtitle.length > 0 && (<div className="project-section-subtitle"> <PortableText value={subtitle} /></div>)}

      <div className="projects-flex-container">
        {projects.map((project, idx) => ( <ProjectCard key={idx} project={project} />))}
      </div>

      {optionalItems?.texts && optionalItems.texts.length > 0 && (
        <div className={`optional-texts float-left`}>
          {optionalItems.texts.map((item, idx) => (
            item.text && item.text.length > 0 && (
              <div key={idx} className="optional-text"><PortableText value={item.text} /></div>
            )
          ))}
        </div>
      )}

      {optionalItems?.checkboxes && optionalItems.checkboxes.length > 0 && (
        <div className={`optional-checkboxes float-left ${cssClass_sectionActive}`}>
          {optionalItems.checkboxes.map((item, idx) => (
            item.checkboxLabel && (
              <div key={idx} className="optional-checkbox-item">

                {item.infoText && item.infoText.length > 0 && ( <div className="optional-checkbox-info"><PortableText value={item.infoText} /></div>)}
                
                <label className="optional-checkbox cursor-pointer">
                  <input type="checkbox" name="optionalItems" value={item.checkboxCode || item.checkboxLabel} />
                  <span>{item.checkboxLabel}</span>
                </label>
                
              </div>
            )
          ))}
        </div>
      )}

      <div className="border-highlight diff-sibiu-valcea diff-background"></div>
    </section>
  );
}
