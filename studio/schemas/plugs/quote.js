export default {
    name: 'quote',
    type: 'object',
    title: 'Quote',
    fields: [
        {
            name: 'person',
            type: 'string'
        },
        {
            name: 'content',
            type: 'simpleBlockContent'
        }
    ],
    preview: {
        select: {
            title: 'person',
        },
        prepare({title}) {
            return {
                title
            }
        }
    }
}
