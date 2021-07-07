export default {
  name: 'illustrationWithURL',
  type: 'object',
  title: 'Image with URL',
  fields: [
    { name: 'image', type: 'illustration' },
    { name: 'url', type: 'url' }
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({ media }) {
      return {
        title: media.image.alt,
        media: media.image,
      }
    },
  },
}
