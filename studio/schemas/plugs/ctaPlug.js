import { GoMegaphone } from 'react-icons/go'

export default {
  type: 'object',
  name: 'ctaPlug',
  title: 'Call to action',
  fields: [
    {
      name: 'label',
      type: 'string'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'body',
      type: 'simpleBlockContent',
      title: 'Body'
    },
    {
      name: 'cta',
      type: 'cta',
    },
    {
      name: 'transparentBg',
      title: 'Use transparent background',
      type: 'boolean',
    },
    {
      name: 'faces',
      title: 'Faces',
      type: 'array',
      of: [
        { type: 'face' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label'
    },
    prepare({ title, subtitle }) {
      return {
        title: `Call to action: ${title || 'Title not set'}`,
        subtitle,
        media: GoMegaphone
      }
    }
  }
}
