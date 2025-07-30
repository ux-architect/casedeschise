import { defineField } from "sanity";
import  duoImage from "./objects/duo-image";

const generalInfo = {
  name: "general-info",
  title: "Detalii",
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
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true },
                },
                {
                  name: 'name',
                  title: 'Nume',
                  type: 'string',
                },
                {
                  name: 'role',
                  title: 'Rol',
                  type: 'string',
                }
              ]
            }
          ]
        }
        ///////////////////////////////////
  ]
};

export default generalInfo;
