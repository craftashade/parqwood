export default {
  name: 'serviceCategory',
  type: 'document',
  title: 'Service Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'image',
      type: 'illustration',
      title: 'Image'
    },
    {
      name: 'services',
      type: 'array',
      title: 'Services',
      of: [
        {
          type: 'reference',
          to: {
            type: 'service',
          }
        }
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image.image'
    }
  }
}
