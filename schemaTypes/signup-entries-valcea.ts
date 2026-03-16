// schemaTypes/signups-valcea.ts

import { signupEntriesFields } from "./objects/signup-entries";

const signupsValcea = {
  name: "signups-valcea",
  title: "Inscrieri Valcea",
  type: "document",
  fieldsets: [{ name: "meta", title: "Metadata", options: { collapsible: true, collapsed: true }, },],
  fields: [...signupEntriesFields],

  preview: {
    select: {
      title: "contact.name",
      subtitle: "contact.email",
    },
  },
};

export default signupsValcea;
