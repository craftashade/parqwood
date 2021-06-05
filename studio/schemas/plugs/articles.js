import { FaRegNewspaper } from "react-icons/fa"

export default {
    name: 'articles',
    type: 'object',
    title: 'Articles',
    fields: [
        {
            name: 'title',
            type: 'string'
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({title}) {
            return {
                title,
                media: FaRegNewspaper
            }
        }
    }
}
