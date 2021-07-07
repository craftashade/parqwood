import { BiDotsHorizontal } from 'react-icons/bi'

export default {
  type: 'object',
  name: 'brands',
  title: 'Brands carousel',
  fields: [
    {
      name: 'images',
      type: 'array',
      of: [
        { type: 'illustrationWithURL' }
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
