import { defineField } from 'sanity'
import { imageValidation } from '../validators/imageValidation'

export default defineField({
  name: 'contentImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    accept: 'image/*', // Accept all image types
  },
  validation: imageValidation
})
