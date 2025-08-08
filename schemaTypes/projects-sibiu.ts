// schemaTypes/projects-sibiu.ts

import { projectFields } from "./objects/project-fields";
import { splitNameWithSectionPreview } from "./objects/split-name-with-section-preview";

const projectsSibiu = {
  name: "projects-sibiu",
  title: "Proiecte Sibiu",
  type: "document",


 fields: [
    ...projectFields,
  ],
  preview: splitNameWithSectionPreview,
};

export default projectsSibiu;
