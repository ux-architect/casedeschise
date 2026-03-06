// schemaTypes/signup-form-valcea.ts

import { signupForm_Fieldsets, signupFormFields } from "./objects/signup-form-fields";

const signupFormValcea = {
  name: "signup-form-valcea",
  title: "Formular de înscriere Vâlcea",
  type: "document",

fieldsets: signupForm_Fieldsets,
 fields: [
    ...signupFormFields,
  ],
};

export default signupFormValcea;
