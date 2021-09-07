export default {
  type: 'object',
  name: 'colorOption',
  title: 'Color Option',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
  ],
  preview: {
    select: {
      image: 'image',
      name: 'name',
    },
    prepare({ image, name }) {
      return {
        title: name,
        media: image
      }
    }
  }
}
