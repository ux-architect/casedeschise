// project-fields-metadata.ts

import TourMetadataInput from '@/sanity/components/tour-metadata-input';
import { defineType } from 'sanity';

export default defineType({
  name: 'tourMetadata',
  title: 'Ordonare',
  type: 'object',
  description: "Fără 'An' specificat, turul nu va apărea pe website (Neîncadrate).",
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
    input: TourMetadataInput,
  },
});
