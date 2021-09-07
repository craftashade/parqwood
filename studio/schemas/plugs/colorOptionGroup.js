import { VscSymbolColor } from 'react-icons/vsc'

export default {
  type: 'object',
  name: 'colorOptionGroup',
  title: 'Color Option Group',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Color Options',
      name: 'options',
      type: 'array',
      of: [{ type: 'colorOption' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      return {
        title: name,
        media: VscSymbolColor
      }
    }
  }
}
