import { BiDotsHorizontal } from 'react-icons/bi'

export default {
  type: 'object',
  name: 'brands',
  title: 'Brands carousel',
  fields: [
    {
      name: 'illustration',
      type: 'array',
      of: [
        {
          type: 'illustration',
        }
      ]
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Brands carousel`,
        media: BiDotsHorizontal
      }
    }
  }
}
