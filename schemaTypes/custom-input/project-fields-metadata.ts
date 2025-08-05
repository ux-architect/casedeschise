// project-fields-metadata.ts

import HorizontalMetadataInput from '@/sanity/components/metadata-input';
import { defineType } from 'sanity';

export default defineType({
  name: 'metadata',
  title: 'Ordonare',
  type: 'object',
  description: "Fără 'An' sau 'Secțiune' specificate, proiectul nu va apărea pe website (Neîncadrate).",
  fields: [
    {
      name: 'year',
      title: 'Editia/Anul',
      type: 'string',
      initialValue: new Date().getFullYear().toString(),
    },
    {
      name: 'section',
      title: 'Sectiune',
      type: 'string',
      options: {
        list: [
          { title: 'neîncadrata', value: "null" },
          { title: '1', value: '1' },
          { title: '2', value: '2' },
          { title: '3', value: '3' },
          { title: '4', value: '4' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'index',
      title: 'Index Ordine',
      type: 'string',
    },
  ],
  components: {
    input: HorizontalMetadataInput,
  },
});
