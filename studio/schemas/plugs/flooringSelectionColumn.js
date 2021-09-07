export default {
  type: 'object',
  name: 'flooringSelectionColumn',
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'illustration',
      name: 'illustration'
    },
    {
      type: 'simpleBlockContent',
      name: 'text'
    },
    {
      type: 'array',
      name: 'flooringProperties',
      of: [{ type: 'flooringProperties' }]
    }
  ]
}
