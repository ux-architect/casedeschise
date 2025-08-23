import { defineType, defineField } from "sanity";

export const eventFields = [

    defineField({
      name: "name",
      title: "Nume",
      description: "Optional se poate folosi conventia: Titlu///Subtitlu",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "metadata",
      title: "Ordonare",
      type: "eventMetadata",
    }),

    defineField({
      name: "profileImage1",
      title: "Profile Image I",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "profileImage2",
      title: "Profile Image II",
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