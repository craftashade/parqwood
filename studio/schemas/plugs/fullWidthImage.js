export default {
    name: 'fullWidthImage',
    type: 'object',
    title: 'Full Width Image',
    fields: [
        {
            name: 'image',
            type: 'illustration'
        },
    ],
    preview: {
        select: {
            image: 'image',
        },
        prepare({ image }) {
            if (!image.image) {
                return { title: 'No image' }
            }
            return {
                title: `Full width image`,
                subtitle: `${image.image.caption ||
                    image.image.alt ||
                    'Missing capton or alt text'} | Size: ${image.image.size || 'default'}`,
                media: image.image
            }
        }
    }
}
