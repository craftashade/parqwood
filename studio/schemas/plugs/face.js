export default {
  type: 'object',
  name: 'face',
  title: 'Face',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Role',
      name: 'role',
      type: 'string'
    },
  ],
  preview: {
    select: {
      image: 'image',
      name: 'name',
      role: 'role',
    },
    prepare({ image, name, role }) {
      return {
        title: name,
        subtitle: role,
        media: image
      }
    }
  }
}
