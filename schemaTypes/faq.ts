// schemaTypes faq.ts

import { defineField } from "sanity";

const faq = {
  name: "faq",
  title: "Lista FAQs",
  type: "document",

  // Make this document a singleton
  __experimental_actions: ['update', 'publish'], 

  fields:[

  defineField({
      name: "name",
      title: "",
      type: "string",
      readOnly: true,
      initialValue: 'Lista FAQs',
      hidden: true,
    }),

    defineField({
        name: 'faqList',
        title: 'Lista FAQs',
         type: 'array',
          of: [
            {
            type: 'object',
            fields: [
              { name: 'question', title: 'Intrebare', type: 'string'},
              { name: 'answer', title: 'Raspuns', type: 'string' },
              { name: 'city', title: 'Oras', type: 'string', initialValue: 'common', options: {
                          list: [
                            { title: 'Comun', value: 'common' },
                            { title: 'Sibiu', value: 'sibiu' },
                            { title: 'Valcea', value: 'valcea' },
                          ] } }
            ]
          }]
      }),

  ]
};

export default faq;
