// schemaTypes/signup-form-sibiu.ts

import { signupForm_Fieldsets, signupFormFields } from "./objects/signup-form-fields";

const signupFormSibiu = {
  name: "signup-form-sibiu",
  title: "Formular de înscriere Sibiu",
  type: "document",

fieldsets: signupForm_Fieldsets,
 fields: [...signupFormFields,],

};

export default signupFormSibiu;
