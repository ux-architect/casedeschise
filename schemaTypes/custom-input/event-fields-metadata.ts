// project-fields-metadata.ts

import YearIndexMetadataInput from '@/sanity/components/year-index-metadata-input';
import { defineType } from 'sanity';

export default defineType({
  name: 'eventMetadata',
  title: 'Ordonare',
  type: 'object',
  description: "Fără 'An' specificat, evenimentul nu va apărea pe website (Neîncadrate).",
  fields: [
    {
      name: 'year',
      title: 'Editia/Anul',
      type: 'string',
      initialValue: new Date().getFullYear().toString(),
    },
    {
      name: 'index',
      title: 'Index Ordine',
      type: 'string',
    },
  ],
  components: {
    input: YearIndexMetadataInput,
  },
});
