import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'

import { schemaTypes } from './schemas'
import { deskStructure } from './DeskStructure'

console.log('Sanity Studio Configuration Loaded')
console.log('Project Name:', process.env.SANITY_STUDIO_PROJECT_NAME)
console.log('Title:', process.env.SANITY_STUDIO_TITLE)
console.log('Project ID:', process.env.SANITY_STUDIO_PROJECT_ID)
console.log('Dataset:', process.env.SANITY_STUDIO_DATASET)
console.log('Preview URL:', process.env.SANITY_STUDIO_PREVIEW_URL)

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
  ],

  schema: {
    types: schemaTypes,
  },
})
