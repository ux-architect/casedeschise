// schemaTypes/signups-sibiu.ts

import { signupEntriesFields } from "./objects/signup-entries";

const signupsSibiu = {
  name: "signups-sibiu",
  title: "Inscrieri Sibiu",
  type: "document",
  fields: [...signupEntriesFields],
};

export default signupsSibiu;
