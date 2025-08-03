// schemaTypes/projects-sibiu.ts

import { projectFields } from "./objects/project-fields";

const projectsSibiu = {
  name: "projects-sibiu",
  title: "Proiecte Sibiu",
  type: "document",


 fields: [
    ...projectFields,
  ],
  preview: {
    select: {
      title: 'name',
      section: 'metadata.section',
      media: 'profileImage',
    },
      prepare(selection: { title?: string; section?: string; media?: any }) {
        const { title = 'Fără titlu', section, media } = selection;
        let sectionLabel = '';

        if (section === '1') sectionLabel = '(s1): ';
        else if (section === '2') sectionLabel = '(s2): ';
        else if (section === '3') sectionLabel = '(s3) ';
        else if (section === '4') sectionLabel = '(s4) ';
        else sectionLabel = '';

        return {  title: `${sectionLabel}${title}`, media,};
    },
  },

};

export default projectsSibiu;
