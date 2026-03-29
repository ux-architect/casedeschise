import { defineField } from "sanity";
import SignupContactInput from "@/sanity/components/signup-contact-input";

export const signupEntriesFields = [
  defineField({
    name: "contact",
    title: "Contact",
    type: "object",
    components: { input: SignupContactInput },
    fields: [
      defineField({ name: "name", title: "Nume și prenume", type: "string" }),
      defineField({ name: "email", title: "Email", type: "string" }),
      defineField({ name: "phone", title: "Telefon", type: "string" }),
    ],
  }),

  defineField({
    name: "objectives",
    title: "Obiective selectate",
    type: "array",
    of: [
      {
        type: "object",
        fields: [defineField({ name: "status", type: "number" })],
        preview: {
          select: { key: "_key", status: "status" },
          prepare(selection) {
            return { title: selection.key + " " + selection.status };
          },
        },
      },
    ],
  }),


  defineField({ name: "optionalItems", title: "Date optionale", type: "string", readOnly: true }),
  defineField({ name: "details", title: "Data înscriere", type: "datetime", readOnly: true, fieldset: "meta" }),
  defineField({ name: "id", title: "Id", type: "string", readOnly: true, fieldset: "meta" }),
  defineField({ name: "metadata", title: "Ordonare", type: "tourMetadata", readOnly: true, hidden: true, fieldset: "meta" }),
];
