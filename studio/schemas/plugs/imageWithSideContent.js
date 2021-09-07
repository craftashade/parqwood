import { BiBookContent } from 'react-icons/bi'

export default {
  type: 'object',
  name: 'imageWithSideContent',
  title: 'Images With Side Content',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'rows',
      type: 'array',
      title: 'Images + Content Blocks',
      description: 'Add, edit, and reorder rows',
      of: [
        { type: 'ctaWithImage' }
      ]
    },
    {
      name: 'topPadding',
      type: 'boolean',
      title: 'Add large top padding'
    },
    {
      name: 'centerText',
      type: 'boolean',
      title: 'Center the title for this section'
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label'
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title || 'Title not set'}`,
        subtitle,
        media: BiBookContent
      }
    }
  }
}
