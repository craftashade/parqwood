import { GoMegaphone } from 'react-icons/go'

export default {
  type: 'object',
  name: 'ctaWithImage',
  title: 'Call to action with Image',
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
      name: 'illustration',
      type: 'image',
    },
    {
      name: 'body',
      type: 'simpleBlockContent',
      title: 'Body'
    },
    {
      name: 'cta',
      type: 'cta',
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label'
    },
    prepare({ title, subtitle }) {
      return {
        title: `Call to action + image: ${title || 'Title not set'}`,
        subtitle,
        media: GoMegaphone
      }
    }
  }
}
