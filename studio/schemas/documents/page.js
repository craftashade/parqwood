export default {
  type: 'document',
  name: 'page',
  title: 'Page',
  initialValue: {
    breadcrumb: true,
    ctaBlock: true,
    featuresBlock: true,
  },
  fieldsets: [
    {
      title: 'Options',
      name: 'options',
      description: 'These options do not apply to frontpage'
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'navMenu',
      type: 'reference',
      title: 'Navigation menu',
      // weak: true, // Uncomment if you want to be able to delete navigation even though pages refer to it
      to: [{ type: 'navigationMenu' }],
      description: 'Which nav menu should be shown, if any',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'hero' },
        { type: 'services' },
        { type: 'ctaPlug' },
        { type: 'ctaWithImage' },
        { type: 'quoteBlock' },
        { type: 'features' },
        { type: 'articles' },
        { type: 'fullWidthImage' },
        { type: 'textParagraph' },
        { type: 'contactForm' },
        { type: 'brands' },
        { type: 'heading' },
        { type: 'imageWithSideContent' },
        { type: 'columns' },
        { type: 'team' },
      ],
    },
    {
      name: 'breadcrumb',
      type: 'boolean',
      title: 'Show breadcrumbs',
      fieldset: 'options'
    },
    {
      title: 'Show CTA block',
      description: 'Toggle showing of CTA block at the bottom of the page',
      name: 'ctaBlock',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      title: 'Show Features block',
      description: 'Toggle showing of Features block at the bottom of the page',
      name: 'featuresBlock',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      name: 'openGraph',
      type: 'openGraph',
      description: 'Does not apply to frontpage. Frontpage will get settings from site settings'
    }
  ],
}
