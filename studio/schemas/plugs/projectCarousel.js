import {BiCarousel} from 'react-icons/bi'

export default {
  name: 'projectCarousel',
  type: 'object',
  title: 'Project Carousel',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'subtitle',
      type: 'string'
    },
    {
      name: 'CTA',
      type: 'cta'
    },
    {
      name: 'projectSingle',
      type: 'array',
      title: 'Projects',
      of: [
        {
          type: 'reference',
          to: [{type: 'projectSingle'}],
          title: 'Project'
        }
      ]

    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    },
    prepare ({title, subtitle}) {
      return {
        title: `${title}`,
        subtitle: `${subtitle}`,
        media: BiCarousel
      }
    }
  }
}
