import {BsImage} from 'react-icons/bs'

export default {
  name: 'projectSingle',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'material',
      type: 'string'
    },
    {
      name: 'image',
      type: 'illustration'
    }
  ],
  preview: {
    select: {
      title: 'material'
    },
    prepare ({title}) {
      return {
        title: `${title}`,
        media: BsImage
      }
    }
  }
}
