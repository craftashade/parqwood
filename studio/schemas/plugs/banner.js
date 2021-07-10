export default {
  type: 'object',
  name: 'banner',
  fields: [
    {
      type: 'color',
      name: 'color',
      title: 'Background Color'
    },
    {
      type: 'string',
      name: 'message'
    },
    {
      name: 'page',
      type: 'reference',
      to: [
        {
          type: 'route',
        },
      ],
    },
    {
      type: 'url',
      name: 'url',
      description: 'Set a custom URL. Page will be prioritised if set.'
    },
  ]
}
