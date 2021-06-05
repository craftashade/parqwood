import {MdList} from "react-icons/md"

export default {
  name: 'features',
  type: 'object',
  title: 'Features',
  fields: [
    {
      name: 'features',
      type: 'array',
      of: [
        {
          type: 'feature'
        }
      ]
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Features',
        media: MdList
      }
    }
  }
}
