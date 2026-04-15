import SectionNamesInput from "@/sanity/components/section-names-input";
import { defineField } from "sanity";

const generalInfo = {
  name: "general-info",
  title: "Setări website",
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
      title: 'Coperta Pagină Sibiu/Vâlcea',
      type: "duoImage",
      
      }),

      {
        name: 'currentYearImage',
        title: 'Imagine ediție curentă',
        type: 'image',
        options: { hotspot: true },
        description:"dimensiune recomandată: max 800x800 ~30kb"
      },

      defineField({
        name: "eventDate",
        title: "Data eveniment",
        type: "string",
      }),


    {
      name: 'misionStatement1',
      title: 'Misiune (coloană 1)',
      type: "array",
      of: [{type: "block"}],
    },

    {
      name: 'misionStatement2',
      title: 'Misiune (coloană 2)',
      type: "array",
      of: [{type: "block"}],
    },

    {
      name: 'contactFormImage',
      title: 'Imagine Devino Gazdă',
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
      description: "Un singur fișier .zip"
    },

    {
      name: "pdfValcea",
      type: "file",
      title: "Program Vâlcea .PDF",
      options: { accept: '.pdf' }
    },

     {
      name: "mediaKitValcea",
      type: "file",
      title: "Media Kit Vâlcea",
      description: "Un singur fișier .zip"
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
              { name: 'city', title: 'Oraș', type: 'string', initialValue: 'sibiu', options: {
                          list: [
                            { title: 'Sibiu', value: 'sibiu' },
                            { title: 'Vâlcea', value: 'valcea' },
                            { title: 'Sibiu și Vâlcea', value: 'sibiu-valcea' },]}
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
               { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, description:"abordare recomandată: logoul înscris într-un .png 200x100 px" },
              { name: 'type', title: 'Tip', type: 'string', initialValue: 'partner',
                        options: {
                          list: [
                            { title: 'Doar Partener', value: 'partner' },
                            { title: 'Partener Mobilitate', value: 'mobility-partner' },
                            { title: 'Partener Media', value: 'media-partner' },
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
              { name: 'city', title: 'Oraș', type: 'string', hidden: true, initialValue: 'sibiu', options: {
                          list: [
                            { title: 'Sibiu', value: 'sibiu' },
                            { title: 'Vâlcea', value: 'valcea' },
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
      title: 'Detalii de Contact',
      type: "array",
      of: [{type: "contactFields"}],
    }),

    //Linkuri Formulare///////////////
     defineField({
      name: 'externalFormLinks_sibiu',
      title: 'Linkuri Formulare Externe - Sibiu',
      type: "externalFormLinks",
    }),

     defineField({
      name: 'externalFormLinks_valcea',
      title: 'Linkuri Formulare Externe - Vâlcea',
      type: "externalFormLinks",
    }),

   //Denumire Sectiuni///////////////
    {
        name: 'sectionNames',
        title: 'Denumire Secțiuni (separate pe ediție)',
        type: 'array',
        of: [
          {
          type: 'object',
          fields: [
            
            { name: 'year', title: 'Ediție', type: 'string' },
            { name: 's1_sibiu', title: 'Secțiune 1 (Sibiu)', type: 'string' },
            { name: 's2_sibiu', title: 'Secțiune 2 (Sibiu)', type: 'string' },
            { name: 's3_sibiu', title: 'Secțiune 3 (Sibiu)', type: 'string' },
            { name: 's4_sibiu', title: 'Secțiune 4 (Sibiu)', type: 'string' },

            { name: 's1_valcea', title: 'Secțiune 1 (Vâlcea)', type: 'string' },
            { name: 's2_valcea', title: 'Secțiune 2 (Vâlcea)', type: 'string' },
            { name: 's3_valcea', title: 'Secțiune 3 (Vâlcea)', type: 'string' },
            { name: 's4_valcea', title: 'Secțiune 4 (Vâlcea)', type: 'string' },

          ],
          components: {
              input: SectionNamesInput,
            },
        }]
     },

    defineField({
      name: 'currentYear',
      title: 'Ediția activă:',
      type: 'string',
      description: "Pe website se vor afișa proiecte/evenimente/tururi din ediția selectată aici. Arhiva va include edițiile anterioare și inclusiv cea activă (selectată aici)",
      initialValue: (new Date().getFullYear()).toString(),
      validation: (rule) => rule.required().error("O valoare e musai"),
      options: {
        list: ['2024', '2025', '2026', '2027', '2028']
      }}),

      defineField({
        name: "signupForms_areActive",
        title: "Formulare de înscriere active",
        type: "boolean",
        initialValue: true,
      }),

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
