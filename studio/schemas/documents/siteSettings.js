export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fieldsets: [
    {
      name: 'contact',
      title: 'Contact information'
    }
  ],
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
      title: 'Address',
      fieldset: 'contact'
    },
    {
      name: 'addressLink',
      type: 'url',
      title: 'Address link to',
      description: 'Enter a Google Maps URL to open when address is clicked',
      fieldset: 'contact'
    },
    {
      name: 'mobile',
      type: 'string',
      title: 'Mobile',
      fieldset: 'contact'
    },
    {
      name: 'tel',
      type: 'string',
      title: 'Tel',
      fieldset: 'contact'
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      fieldset: 'contact'
    },
    {
      name: 'emailTo',
      type: 'string',
      title: 'Contact form submission destination',
      description: 'Enter an email address or a secret token (token preferred)',
    },
    {
      name: 'banner',
      type: 'banner',
      title: 'Site-wide banner',
    },
  ]
}
