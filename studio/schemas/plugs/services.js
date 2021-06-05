import { BiWrench } from 'react-icons/bi'

export default {
  type: 'object',
  name: 'services',
  title: 'Services',
  fields: [
    {
      type: 'string',
      name: 'title'
    },
    {
      type: 'text',
      name: 'text'
    },
    {
      type: 'array',
      name: 'rows',
      of: [{ type: 'textWithIllustration' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title, 
        media: BiWrench
      }
    }
  }
}
