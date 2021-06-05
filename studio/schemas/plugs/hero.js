import { BiCarousel } from 'react-icons/bi'

export default {
  type: 'object',
  name: 'hero',
  title: 'Hero',
  fields: [
    {
      name: 'label',
      type: 'string'
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'tagline',
      type: 'simpleBlockContent'
    },
    {
      name: 'cta',
      type: 'cta'
    },
    {
      name: 'slides',
      type: 'array',
      title: 'Slides',
      description: 'Add, edit, and reorder slides',
      of: [
        { type: 'illustration' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'label',
      disabled: 'disabled'
    },
    prepare({ title, disabled }) {
      return {
        title: `Hero: ${disabled ? 'DISABLED' : title}`,
        media: BiCarousel
      }
    }
  }
}
