export default {
  type: 'object',
  name: 'contactForm',
  title: 'Contact Form',
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