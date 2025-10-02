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
      description:"recomandat landscape: 2400x1200px ~ 2000x1000px ~ 1800x900px (nu e super strictă proporția, dar de evitat portrait!) orientativ: 300-500KB"
    }),

    defineField({
      name: "images",   // (change name if you want)
      title: "Imagini",
      type: "array",
      of: [{ type: "image", options: { hotspot: true },}],
      description:"recomandat landscape: 2400x1200px ~ 2000x1000px ~ 1800x900px (nu e super strictă proporția, dar de evitat portrait!) orientativ: 300-500KB"
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
      name: "otherInfo",
      title: "Alte Info",
      description: "Linkurile (ex: www.sicdesign.ro) trebuie explicit setate ca 'Link' (iconita link din dreapta - vor avea culoarea albastru/mov aici, altfel va fi doar 'text subliniat') Textul poate fi 'www.sicdesign.ro' dar linkul trebuie sa fie in forma http://www.sicdesign.ro",
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
          { title: 'Fotografiatul permis', value: 'yesPhotos' },
          { title: 'Accesibil', value: 'accesible' },
          { title: 'Pentru copii', value: 'forChildren' },
        ],
        layout: 'checkbox'
      }
    },

    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "Fără  diacritice sau caractere speciale aici! Fiecare slug trebuie să fie unic – nu poate fi repetat la proiecte, evenimente sau tururi, indiferent de oraș sau an!",
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
    
  ];