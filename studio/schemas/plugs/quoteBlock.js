import { IoMdQuote } from "react-icons/io";

export default {
    name: 'quoteBlock',
    type: 'object',
    title: 'Quote Block',
    fields: [
        {
            name: 'quotes',
            type: 'array',
            title: 'Quotes',
            description: 'Add, edit, and reorder quotes',
            of: [
                {type: 'quote'}
            ]
        }
    ],
    preview: {
        prepare() {
            return {
                title: 'Quotes',
                media: IoMdQuote
            }
        }
    }
}
