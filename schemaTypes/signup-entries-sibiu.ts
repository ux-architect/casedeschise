// schemaTypes/signups-sibiu.ts

import { signupEntriesFields } from "./objects/signup-entries";

const signupsSibiu = {
  name: "signups-sibiu",
  title: "Inscrieri Sibiu",
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

export default signupsSibiu;
