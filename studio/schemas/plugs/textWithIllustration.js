export default {
  type: 'object',
  name: 'textWithIllustration',
  fields: [
    {
      type: 'string',
      name: 'title'
    },
    {
      type: 'image',
      name: 'icon'
    },
    {
      type: 'simpleBlockContent',
      name: 'text'
    },
    {
      type: 'illustration',
      name: 'illustration'
    },
    {
      type: 'url',
      name: 'url'
    }
  ]
}
