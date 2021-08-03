import { BsLayoutThreeColumns } from 'react-icons/bs'

export default {
  type: 'object',
  name: 'columns',
  title: 'Columns',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'titlePosition',
      type: 'string',
      title: 'Title Position',
      options: {
        layout: 'radio',
        list: ['left', 'right']
      }
    },
    {
      name: 'columns',
      type: 'array',
      title: 'Columns',
      description: 'Add, edit, and reorder columns',
      of: [
        { type: 'feature' }
      ]
    },
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: `${title || 'Title not set'}`,
        media: BsLayoutThreeColumns
      }
    }
  }
}
