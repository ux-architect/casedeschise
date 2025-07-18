import { defineField } from "sanity";
import { projectFields } from "./objects/project-fields";

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
     {
      name: 'coverSibiu',
      title: 'Cover Sibiu',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'coverValcea',
      title: 'Cover Valcea',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
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
