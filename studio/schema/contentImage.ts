import { defineField } from 'sanity'
import { imageValidation } from '../validators/imageValidation'

export const contentImage = defineField({
  name: 'contentImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    accept: 'image/*', // Accept all image types
  },
  fields: [
    {
      name: 'alt',
      description: 'Een beschrijving van de foto',
      type: 'string',
      title: 'Alternatieve tekst',
    },
  ],
  validation: imageValidation
})
