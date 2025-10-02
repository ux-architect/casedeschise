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
          { title: 'Fotografiatul permis', value: 'yesPhotos' },
          { title: 'Accesibil', value: 'accesible' },
          { title: 'Pentru copii', value: 'forChildren' },
          { title: 'Locuri ocupate (nu se mai fac inscrieri)', value: 'soldOut' },
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
      name: "otherInfo",
      title: "Alte Info",
      description: "Linkurile (ex: www.sicdesign.ro) trebuie explicit setate ca 'Link' (iconita link din dreapta - vor avea culoarea albastru/mov aici, altfel va fi doar 'text subliniat') Textul poate fi 'www.sicdesign.ro' dar linkul trebuie sa fie in forma http://www.sicdesign.ro",
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