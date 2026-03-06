// schemaTypes/signups-valcea.ts

import { signupEntriesFields } from "./objects/signup-entries";

const signupsValcea = {
  name: "signups-valcea",
  title: "Inscrieri Valcea",
  type: "document",
  fields: [...signupEntriesFields],
};

export default signupsValcea;
