// sanity.config.ts

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './sanity.config.deskStructure'
import { media } from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'casedeschise.ro',

  // projectId: 'x30qpt6x',
  projectId: "4sefwx29", //ux.studio.sibiu
  dataset: 'production',
  basePath: "/studio",

  plugins: [structureTool({ structure: deskStructure }), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
