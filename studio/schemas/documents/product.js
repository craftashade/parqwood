export default {
  type: 'document',
  name: 'product',
  title: 'Product',
  fieldsets: [
    {
      name: 'flooringSelection',
      title: 'Flooring selection'
    },
    {
      name: 'colorOptions',
      title: 'Color options'
    },
    {
      name: 'patterns',
      title: 'Patterns'
    },
    {
      name: 'downloads',
      title: 'Downloads'
    }
  ],
  fields: [
    {
      name: 'productName',
      type: 'string',
      title: 'Product Name'
    },
    {
      name: 'productCategory',
      type: 'reference',
      // weak: true, // Uncomment if you want to be able to delete navigation even though pages refer to it
      to: [{ type: 'productCategory' }],
      title: 'Product Category',
      description: 'Category of product',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'logo',
      type: 'illustration',
      title: 'Product Logo'
    },
    {
      name: 'image',
      type: 'illustration',
      title: 'Image'
    },
    {
      name: 'bgColor',
      type: 'color',
      title: 'Background pattern color'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'text',
      type: 'simpleBlockContent',
      title: 'Text'
    },
    {
      name: 'flooringSelectionTitle',
      type: 'string',
      title: 'Title',
      description: 'Leave blank for default "Flooring Selections"',
      fieldset: 'flooringSelection'
    },
    {
      name: 'flooringSelectionColumns',
      type: 'array',
      title: 'Selections',
      of: [{ type: 'flooringSelectionColumn' }],
      fieldset: 'flooringSelection'
    },
    {
      name: 'colorOptionTitle',
      type: 'string',
      title: 'Title',
      description: 'Leave blank for default "Your colour options"',
      fieldset: 'colorOptions'
    },
    {
      name: 'colorOptionGroups',
      type: 'array',
      title: 'Color Options',
      of: [{ type: 'colorOptionGroup' }],
      fieldset: 'colorOptions'
    },
    {
      name: 'patternTitle',
      type: 'string',
      title: 'Title',
      description: 'Leave blank for default "Patterns"',
      fieldset: 'patterns'
    },
    {
      name: 'patterns',
      type: 'array',
      title: 'Patterns',
      of: [{ type: 'colorOption' }],
      fieldset: 'patterns'
    },
    {
      name: 'downloadTitle',
      type: 'string',
      title: 'Title',
      description: 'Leave blank for default "downloads"',
      fieldset: 'downloads'
    },
    {
      name: 'downloads',
      type: 'array',
      title: 'Downloads',
      of: [{ type: 'download' }],
      fieldset: 'downloads'
    }
  ],
  preview: {
    select: {
      title: 'productName',
      category: 'productCategory.title',
      media: 'logo.image'
    },
    prepare ({title, category, media}) {
      return {
        title,
        subtitle: category,
        media
      }
    }
  }
}
