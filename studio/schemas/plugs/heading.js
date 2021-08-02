import { MdTitle } from 'react-icons/md'

export default {
  type: 'object',
  name: 'heading',
  title: 'Heading',
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
      type: 'cta',
      name: 'cta'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare ({title}) {
      return {
        title,
        media: MdTitle
      }
    }
  }
}
