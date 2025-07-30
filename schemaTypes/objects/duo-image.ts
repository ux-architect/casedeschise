//this file is: duo-image.ts

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'duoImage',
  title: 'Duo Image',
  type: 'object',
  fields: [
    defineField({
      name: 'sibiu',
      title: 'Sibiu',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'valcea',
      title: 'Valcea',
      type: 'image',
      options: { hotspot: true }
    })
  ]
});