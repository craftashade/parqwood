export default {
  type: 'document',
  name: 'project',
  title: 'Project',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'thumbnail',
      type: 'illustration',
      title: 'Thumbnail',
      description: 'For megamenu'
    },
    {
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [{
        type: 'reference',
        to: {type: 'projectSingle'},
        title: 'Project'
      }]
    }
  ],
}
