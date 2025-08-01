import { defineType, defineField } from "sanity";

export const projectFields = [

    defineField({
      name: "name",
      title: "Nume",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "metadata",
      title: "Ordonare",
      type: "metadata", // <- the object defined above
    }),
    //  defineField({
    //   name: "year",
    //   title: "Editia/Anul",
    //   type: "string",
    //   initialValue: (new Date().getFullYear()).toString(),
    //   }),

    //   defineField({
    //     name: 'sectiune',
    //     title: 'Sectiune',
    //     type: 'string',
    //     options: {
    //       list: [
    //         { title: '1', value: '1' },
    //         { title: '2', value: '2' },
    //         { title: '3', value: '3' },
    //         { title: '4', value: '4' },
    //       ],
    //       layout: 'dropdown' // optional, but explicitly sets it as a dropdown
    //     }
    //   }),

    //   defineField({
    //     name: "index",
    //     title: "Index Ordine",
    //     type: "string",
    //   }),

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
        source: doc => {
          const name = doc.name || ''
          const year = doc.year || 'neincadrat'
          return `${year}-${name}`
        },
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
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