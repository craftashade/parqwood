import {VscFileSubmodule} from 'react-icons/vsc'

export default {
  name: 'productCategory',
  type: 'document',
  title: 'Product Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'products',
      type: 'array',
      title: 'Products',
      of: [
        {
          type: 'reference',
          to: {
            type: 'product'
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare ({title}) {
      return {
        title,
        media: VscFileSubmodule
      }
    }
  }
}
