import { defineType, defineField } from "sanity";

export const projectFields = [

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
      type: "metadata", // <- the object defined above
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
      name: "address",
      title: "Adresa",
      type: "string",
    }),

    defineField({
      name: "gps",
      title: "Coordonate",
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
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "Fără  diacritice sau caractere speciale aici!",
      options: {
        source: doc => {
          const name = (doc as any).name || ''
          const year = (doc as any).metadata?.year || 'neincadrat'
          
          return `${name}`
        },
        slugify: input =>
          input
            .toLowerCase()
            .normalize('NFD')                         // Break diacritics into separate codepoints
            .replace(/[\u0300-\u036f]/g, '')         // Remove diacritic marks
            .replace(/\s+/g, '-')                    // Replace spaces with dashes
            .replace(/[^a-z0-9\-]/g, '')             // Remove any other special characters
            .slice(0, 200),
      },
        validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: "otherInfo",
      title: "Alte Info",
      type: "array",
      of: [{type: "block"}],
    }),
  ];