import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { media } from 'sanity-plugin-media'

import { schemaTypes } from './schema/index'
import { deskStructure } from './DeskStructure'
import { seoMetaFields } from 'sanity-plugin-seo'

export default defineConfig({
  name: process.env.SANITY_STUDIO_PROJECT_NAME,
  title: process.env.SANITY_STUDIO_TITLE,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'default-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
      title: 'Content Management',
    }),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    media(),
    seoMetaFields(),
  ],

  schema: {
    name: 'default',
    types: schemaTypes,
  },
})
