import { GrGroup } from 'react-icons/gr'

export default {
    name: 'team',
    type: 'object',
    title: 'Team',
    fields: [
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'image',
            type: 'illustration'
        },
        {
            name: 'cta',
            type: 'cta'
        }
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({title}) {
            return {
                title: `Team: ${title}`,
                media: GrGroup
            }
        }
    }
}
