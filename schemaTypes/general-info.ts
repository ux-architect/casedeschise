import SectionNamesInput from "@/sanity/components/section-names-input";
import { defineField } from "sanity";

const generalInfo = {
  name: "general-info",
  title: "Setari website",
  type: "document",
  __experimental_actions: ['update', 'publish'], // disables create + delete

 fields: [
  defineField({
     name: "name",
     title: "",
     type: "string",
     readOnly: true,
     initialValue: '',
     hidden: true,
   }),

     defineField({
      name: 'siteEntryCover',
      title: 'Coperta Website',
      type: "duoImage",
      hidden: true,
      }),

      defineField({
      name: 'cityPageCover',
      title: 'Coperta Pagina Sibiu/Valcea',
      type: "duoImage",
      
      }),

      {
        name: 'currentYearImage',
        title: 'Imagine editie curenta',
        type: 'image',
        options: { hotspot: true },
        description:"dimensiuniune recomandata: max 800x800 ~30kb"
      },

      defineField({
        name: "eventDate",
        title: "Data eveniment",
        type: "string",
      }),


    {
      name: 'misionStatement1',
      title: 'Misiune (coloana 1)',
      type: "array",
      of: [{type: "block"}],
    },

    {
      name: 'misionStatement2',
      title: 'Misiune (coloana 2)',
      type: "array",
      of: [{type: "block"}],
    },

    {
      name: 'contactFormImage',
      title: 'Imagine Devino Gazda',
      type: 'image',
      options: { hotspot: true },
      hidden: true,
    },
   
    //Program PDF///////////////
    {
      name: "pdfSibiu",
      type: "file",
      title: "Program Sibiu .PDF ",
      options: { accept: '.pdf' }
    },

     {
      name: "mediaKitSibiu",
      type: "file",
      title: "Media Kit Sibiu",
      description: "Un singur fisier .zip"
    },

    {
      name: "pdfValcea",
      type: "file",
      title: "Program Valcea .PDF",
      options: { accept: '.pdf' }
    },

     {
      name: "mediaKitValcea",
      type: "file",
      title: "Media Kit Valcea",
      description: "Un singur fisier .zip"
    },


    //Echipa///////////////
    {
          name: 'team',
          title: 'Echipa',
          type: 'array',
          of: [
            {
            type: 'object',
            fields: [
              { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              { name: 'name', title: 'Nume', type: 'string' },
              { name: 'role', title: 'Rol', type: 'string' },
              { name: 'city', title: 'Oras', type: 'string', initialValue: 'sibiu', options: {
                          list: [
                            { title: 'Sibiu', value: 'sibiu' },
                            { title: 'Valcea', value: 'valcea' },
                            { title: 'Sibiu și Valcea', value: 'sibiu-valcea' },]}
          }]
     }],
    },
    //Sponsori///////////////
    defineField({
          name: 'partners',
          title: 'Parteneri',
          type: 'array',
          of: [
            {
            type: 'object',
            fields: [
              { name: 'name', title: 'Nume', type: 'string' },
               { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, description:"abordare recomandata: logoul inscris intrun .png 200x100 px" },
              { name: 'type', title: 'Tip', type: 'string', initialValue: 'partner',
                        options: {
                          list: [
                            { title: 'Doar Partener', value: 'partner' },
                            { title: 'Partner Mobilitate', value: 'mobility-partner' },
                            { title: 'Partner Media', value: 'media-partner' },
                            { title: 'Sponsor', value: 'sponsor' },
                            // Add more options here
                          ] }
              },
              { name: 'link', title: 'Link/Website', type: 'string' },
            ]
          }]
     }),

    //Social///////////////
    defineField({
          name: 'socialMedia',
          title: 'Social-Media',
          type: 'array',
          of: [
            {
            type: 'object',
            fields: [
              { name: 'name', title: 'Nume', type: 'string', hidden: true },
              { name: 'city', title: 'Oras', type: 'string', hidden: true, initialValue: 'sibiu', options: {
                          list: [
                            { title: 'Sibiu', value: 'sibiu' },
                            { title: 'Valcea', value: 'valcea' },
                          ] }, validation: (Rule) => Rule.required(), },
              { name: 'link', title: 'Link social media', type: 'string' },
            ],
            preview: {
              select: {
                name: 'name',
                city: 'city',
              },
              prepare({ name, city }) {
                return {
                  title: `${name} - ${city}`,
                }
              },
            }
          }],
          
     }),

     //Contact///////////////

    defineField({
      name: 'contactFields',
      title: 'Detalii Contact',
      type: "array",
      of: [{type: "contactFields"}],
    }),

    //Linkuri Formulare///////////////
     defineField({
      name: 'externalFormLinks_sibiu',
      title: 'Linkuri Forumlare Externe - Sibiu',
      type: "externalFormLinks",
    }),

     defineField({
      name: 'externalFormLinks_valcea',
      title: 'Linkuri Forumlare Externe - Valcea',
      type: "externalFormLinks",
    }),

   //Denumire Sectiuni///////////////
    {
        name: 'sectionNames',
        title: 'Denumire Sectiuni (separate pe editie)',
        type: 'array',
        of: [
          {
          type: 'object',
          fields: [
            
            { name: 'year', title: 'Editie', type: 'string' },
            { name: 's1_sibiu', title: 'Sectiune 1 (Sibiu)', type: 'string' },
            { name: 's2_sibiu', title: 'Sectiune 2 (Sibiu)', type: 'string' },
            { name: 's3_sibiu', title: 'Sectiune 3 (Sibiu)', type: 'string' },
            { name: 's4_sibiu', title: 'Sectiune 4 (Sibiu)', type: 'string' },

            { name: 's1_valcea', title: 'Sectiune 1 (Valcea)', type: 'string' },
            { name: 's2_valcea', title: 'Sectiune 2 (Valcea)', type: 'string' },
            { name: 's3_valcea', title: 'Sectiune 3 (Valcea)', type: 'string' },
            { name: 's4_valcea', title: 'Sectiune 4 (Valcea)', type: 'string' },

          ],
          components: {
              input: SectionNamesInput,
            },
        }]
     },

    defineField({
      name: 'currentYear',
      title: 'Editia activa:',
      type: 'string',
      description: "Pe website se vor afisa proiecte/evenimente/tururi din editia selectata aici",
      initialValue: (new Date().getFullYear()).toString(),
      validation: (rule) => rule.required().error("O valoare e musai"),
      options: {
        list: ['2024', '2025', '2026']
      }}),

      defineField({
        name: "sliderInterval",
        title: "Interval slider (ms)",
        type: "string",
      }),

      defineField({
        name: "revalidateInterval",
        title: "Interval actualizare date (secunde)",
        type: "string",
        description: "recomandat: 3 (3s) - pentru editare || 21600s (6h) - pentru eveniment",
      }),


  ]
};

export default generalInfo;
