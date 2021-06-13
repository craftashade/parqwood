export default {
  type: 'document',
  name: 'project',
  title: 'Project',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'thumbnail',
      type: 'illustration',
      title: 'Thumbnail',
      description: 'For megamenu'
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'illustration' }]
    }
  ],
}
