export default {
  type: 'object',
  name: 'feature',
  fields: [
    {
      type: 'string',
      name: 'title'
    },
    {
      type: 'string',
      name: 'subtitle',
      description: 'Appears on top of title as a sub-text'
    },
    {
      type: 'image',
      name: 'icon'
    },
    {
      type: 'simpleBlockContent',
      name: 'text'
    },
  ]
}
