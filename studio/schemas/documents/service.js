export default {
  type: 'document',
  name: 'service',
  title: 'Service',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'serviceCategory',
      type: 'reference',
      // weak: true, // Uncomment if you want to be able to delete navigation even though pages refer to it
      to: [{ type: 'serviceCategory' }],
      title: 'Service Category',
      description: 'Category of service',
    },
    {
      name: 'text',
      type: 'simpleBlockContent',
      title: 'Text'
    },
    {
      name: 'thumbnail',
      type: 'illustration',
      title: 'Featured Image'
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'illustration' }]
    }
  ],
}
