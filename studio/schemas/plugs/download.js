export default {
  type: 'object',
  name: 'download',
  title: 'Download',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'File',
      name: 'file',
      type: 'file'
    }
  ],
  preview: {
    select: {
      image: 'image',
      name: 'name'
    },
    prepare ({image, name}) {
      return {
        title: name,
        media: image
      }
    }
  }
}
