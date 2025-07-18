import { defineField } from "sanity";

export const projectFields = [
  defineField({
    name: "name",
    title: "Nume",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  {
    name: "profileImage",
    title: "Profile Image",
    type: "image",
    description: "Upload a profile picture",
    options: { hotspot: true },
    fields: [
      {
        name: "alt",
        title: "Alt",
        type: "string",
      },
    ],
  },
  {
    name: "address",
    title: "Adresa",
    type: "string",
  },
  {
    name: "description",
    title: "Descriere",
    type: "array",
    of: [{ type: "block" }],
  },
  {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name', // Generates slug from the title
        maxLength: 96,
      }
    },
];