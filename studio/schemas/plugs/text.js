export default {
  type: 'object',
  name: 'textParagraph',
  title: 'Text Paragraph',
  description: 'A big text. Centered.',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Text',
      name: 'text',
      type: 'simpleBlockContent'
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare({title}) {
      return {
        title: `Text - ${title}`,
      }
    }
  }
}