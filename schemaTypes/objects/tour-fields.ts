import { defineType, defineField } from "sanity";

export const tourFields = [

    defineField({
      name: "name",
      title: "Nume",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "metadata",
      title: "Ordonare",
      type: "tourMetadata",
    }),

    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "images",   // (change name if you want)
      title: "Imagini",
      type: "array",
      of: [{ type: "image", options: { hotspot: true },}],
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

    {
      name: 'tags',
      title: 'Tags',
      description: "Tagurile afisează iconite specifice",
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Parcare bicilete', value: 'bikeParking' },
          { title: 'Fotografiatul interzis', value: 'noPhotos' },
          { title: 'Accesibil', value: 'accesible' },
          { title: 'Pentru copii', value: 'forChildren' },
        ],
        layout: 'checkbox'
      }
    },

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