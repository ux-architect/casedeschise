import { defineType, defineField } from "sanity";
import ExternalFormInput from "@/sanity/components/external-form-input";

export default defineType({
  name: "externalFormLinks",
  title: "Linkuri Forumlare Externe",
  type: "object",
  fields: [

    defineField({
      name: "visitFormExternalUrl",
      title: "Formular inscriere: participare la vizita obiective",
      type: "string",
    }),
    defineField({
      name: "hostFormExternalUrl",
      title: "Formular inscriere: devin-o gazda",
      type: "string",
    }),
    defineField({
      name: "volunteerFormExternalUrl",
      title: "Formular inscriere: voluntari",
      type: "string",
    }),
  ],
  components: {
    input: ExternalFormInput,
  },
});
