import { defineType, defineField } from "sanity";
import ContactInput from "@/sanity/components/contact-oar-input";

export default defineType({
  name: "contactFields",
  title: "Detalii Contact",
  type: "object",
  fields: [

    defineField({
      name: "city",
      title: "Oras",
      type: "string",
      hidden: false,
    }),
    defineField({
      name: "address",
      title: "Adresa",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Email Contact Direct",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Telefon Contact Direct",
      type: "string",
    }),
    defineField({
      name: "contactEmailForms",
      title: "Email contact formulare",
      description: "(inscriere: obiective, tururi, voluntari)",
      type: "string",
    }),
  ],
  components: {
    input: ContactInput,
  },
});
