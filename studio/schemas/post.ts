import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import contentImage from './contentImage'

export default defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required().error('Body is required'),
    }),
    defineField({
      name: 'year',
      title: 'Jaar',
      type: 'string',
      validation: (Rule) => Rule.required().error('Year is required'),
    }),
    contentImage,
    defineField({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      of: [contentImage],
      options: {
        layout: 'list',
        sortable: true,
        modal: {
          type: 'dialog',
        },
      },
      validation: (Rule) => Rule.max(10).error('You can only add up to 10 images').min(1).error('At least one image is required'),
    }),
    defineField({
      name: 'colorScheme',
      title: 'Project kleur',
      type: 'string',
      options: {
        list: [
          { title: 'Geel', value: 'yellow' },
          { title: 'Licht bruin', value: 'brown' },
          { title: 'Groen', value: 'green' },
          { title: 'Donker bruin', value: 'dark-brown' }
        ],
        layout: 'radio',
      },
      // Randomly select one of the four options as the default value
      initialValue: () => {
        const options = ['yellow', 'brown', 'green', 'dark-brown']
        return options[Math.floor(Math.random() * options.length)]
      },
      validation: (Rule) => Rule.required().error('Color Scheme is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'contentImage',
    },
  },
})
