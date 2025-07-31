// schemaTypes/projects-sibiu.ts

import { projectFields } from "./objects/project-fields";

const projectsSibiu = {
  name: "projects-sibiu",
  title: "Proiecte Sibiu",
  type: "document",

 fields: [
    ...projectFields,
  ]
};

export default projectsSibiu;
