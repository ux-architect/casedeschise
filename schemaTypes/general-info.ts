import { defineField } from "sanity";
import  duoImage from "./objects/duo-image";

const generalInfo = {
  name: "general-info",
  title: "Setari website",
  type: "document",

 fields: [
  defineField({
     name: "name",
     title: "",
     type: "string",
     readOnly: true,
     initialValue: 'Pagina de start',
     hidden: true,
   }),

     defineField({
      name: 'siteEntryCover',
      title: 'Coperta Website',
      type: "duoImage",
      
      }),

      defineField({
      name: 'cityPageCover',
      title: 'Coperta Pagina Sibiu/Valcea',
      type: "duoImage",
      
      }),

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
              { name: 'role', title: 'Rol', type: 'string' }
            ]
          }]
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
               { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
              { name: 'type', title: 'Tip', type: 'string',
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
  ]
};

export default generalInfo;
