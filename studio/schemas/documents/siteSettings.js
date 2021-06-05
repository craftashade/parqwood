export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      title: 'Open graph',
      name: 'openGraph',
      description: 'These will be the default meta tags on all pages that have not set their own',
      type: 'openGraph'
    },
    {
      name: 'address',
      type: 'simpleBlockContent',
      title: 'Address'
    },
    {
      name: 'mobile',
      type: 'string',
      title: 'Mobile'
    },
    {
      name: 'tel',
      type: 'string',
      title: 'Tel'
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email'
    },
  ]
}
