import { defineType, defineField } from "sanity";

export const tourFields = [

    defineField({
      name: "name",
      title: "Nume",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "year",
      title: "Editia/Anul",
      type: "string",
      initialValue: (new Date().getFullYear()).toString(),
      }),

    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description: "Upload a profile picture",
      options: { hotspot: true },
    }),

    defineField({
      name: "images",   // (change name if you want)
      title: "Imagini",
      type: "array",
      description: "Prima imagine devine 'principala'",
      of: [{ type: "image", options: { hotspot: true },}],
    }),

    defineField({
      name: "address",
      title: "Adresa",
      type: "string",
    }),

    defineField({
      name: "visitTime",
      title: "Program",
      type: "array",
      of: [ {type: "string"}],
    }),

    defineField({
      name: "transport",
      title: "Transport in comun",
      type: "string"
    }),

    defineField({
      name: "description",
      title: "Despre",
      type: "array",
      of: [{type: "block"}],
    }),

    defineField({
      name: "gps",
      title: "Coordonate",
      type: "string",
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    
  ];