import { defineType, defineField } from "sanity";


export const signupForm_Fieldsets = [
  { name: "section1", title: "Secțiunea 1", options: { collapsible: true, collapsed: false } }, 
  { name: "section2", title: "Secțiunea 2", options: { collapsible: true, collapsed: false } },
  { name: "section3", title: "Secțiunea 3", options: { collapsible: true, collapsed: false } },
]

export const signupFormFields = [

    defineField({ name: "title", title: "Titlu formular", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "terms_conditions",
      title: "Termeni și condiții",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "terms_checkbox_label",
      title: "Text checkbox termeni",
      type: "string",
    }),
  
    // Section 1
    defineField({ name: "s1_title", title: "Titlu (s1)", type: "string", fieldset: "section1", }),
    defineField({
      name: "s1_subtitle",
      title: "Subtitlu formatabil (s1)",
      type: "array",
      fieldset: "section1",
      of: [{ type: "block" }],
    }),
    defineField({
          name: 's1_projects',
          title: 'Obiective (s1)',
          type: 'array',
          fieldset: "section1",
          of: [
            {
            type: 'object',
            fields: [
              { name: 'image', title: 'Imagine', type: 'image', options: { hotspot: true } },
              { name: 'name', title: 'Nume', type: 'string' },
              { name: 'code', title: 'Cod', type: 'string' },
              { name: 'info', title: 'Info', type: 'string' },
            ]
     }],
    }),


    // Section 2 
    defineField({ name: "s2_title", title: "Titlu (s2)", type: "string",fieldset: "section2", }),
    defineField({
      name: "s2_subtitle",
      title: "Subtitlu formatabil (s2)",
      type: "array",
      fieldset: "section2",
      of: [{ type: "block" }],
    }),
    defineField({
          name: 's2_projects',
          title: 'Obiective (s2)',
          type: 'array',
          fieldset: "section2",
          of: [
            {
            type: 'object',
            fields: [
              { name: 'image', title: 'Imagine', type: 'image', options: { hotspot: true } },
              { name: 'name', title: 'Nume', type: 'string' },
              { name: 'code', title: 'Cod', type: 'string' },
              { name: 'info', title: 'Info', type: 'string' },
            ]
     }],
    }),

    // Section 3 
    defineField({ name: "s3_title", title: "Titlu (s3)", type: "string",fieldset: "section3", }),
    defineField({
      name: "s3_subtitle",
      title: "Subtitlu formatabil (s3)",
      type: "array",
      fieldset: "section3",
      of: [{ type: "block" }],
    }),
    defineField({
          name: 's3_projects',
          title: 'Obiective (s3)',
          type: 'array',
          fieldset: "section3", 
          of: [
            {
            type: 'object',
            fields: [
              { name: 'image', title: 'Imagine', type: 'image', options: { hotspot: true } },
              { name: 'name', title: 'Nume', type: 'string' },
              { name: 'code', title: 'Cod', type: 'string' },
              { name: 'info', title: 'Info', type: 'string' },
            ]
     }],
    }),

  ];