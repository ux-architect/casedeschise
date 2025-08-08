import { projectFields } from "./objects/project-fields";
import { splitNameWithSectionPreview } from "./objects/split-name-with-section-preview";

const projectsValcea = {
  name: "projects-valcea",
  title: "Proiecte Valcea",
  type: "document",
  fields: [
    ...projectFields,
  ],
  
  preview: splitNameWithSectionPreview,
};

export default projectsValcea;