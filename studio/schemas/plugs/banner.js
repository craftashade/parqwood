export default {
  type: 'object',
  name: 'banner',
  fields: [
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
