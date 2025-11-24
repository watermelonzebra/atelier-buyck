import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'
import { contentImage } from './contentImage'
import { imageValidation } from '../validators/imageValidation'

export const pageSettings = defineType({
  name: 'pageSettings',
  type: 'document',
  icon: CogIcon,
  title: 'Page Settings',
  description: 'Manage content and SEO for individual pages',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      description: 'Select which page this content is for',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Projects', value: 'projects' },
          { title: 'Contact', value: 'contact' },
        ],
      },
      initialValue: 'home',
    }),
    defineField({
      ...contentImage,
      name: 'foldImage',
      group: 'content',
      hidden: ({ document }) => document?.page !== 'home',
      validation: (rule) =>
        rule.custom((currentValue, { document }) => {
          //   imageValidation(rule)
          // in a custom validation rule, check if the field should be shown, and if yes, show an error if the value is not set
          if (document?.page === 'home' && currentValue === undefined)
            return 'This is required when the page is home'
          // if we are not showing the field, or if the field has a value
          // then the validation passes
          return true
        }),
    }),
    defineField({
      name: 'contactData',
      type: 'object',
      group: 'content',
      hidden: ({ document }) => document?.page !== 'contact',
      validation: (rule) =>
        rule.custom((currentValue, { document }) => {
          //   imageValidation(rule)
          // in a custom validation rule, check if the field should be shown, and if yes, show an error if the value is not set
          if (document?.page === 'contact' && currentValue === undefined)
            return 'This is required when the page is Contact'
          // if we are not showing the field, or if the field has a value
          // then the validation passes
          return true
        }),
      fields: [
        defineField({
          name: 'showName',
          description: 'Toon je naam boven de contactgegevens',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'name',
          title: 'Uw naam',
          type: 'string',
          hidden: ({ document }) => !(document?.contactData as any)?.showName,
        }),
        defineField({
          name: 'phone',
          type: 'string',
          validation: (rule) => rule.required().error('Telefoonnummer is verplicht'),
        }),
        defineField({
          name: 'email',
          type: 'string',
          validation: (rule) => rule.required().email(),
        }),
        defineField({
          name: 'btw',
          title: 'BTW nummer',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'address',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          ...contentImage,
          name: 'contactDataImage',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Meta Fields',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
})
