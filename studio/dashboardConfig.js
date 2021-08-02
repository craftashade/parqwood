export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'document-list',
      options: { title: 'Recent articles', order: '_createdAt desc', types: ['article'] },
      layout: { width: 'medium' }
    },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '610520c6f1ddb0ca86620f9e',
                  title: 'Sanity Studio',
                  name: 'parqwood-studio',
                  apiId: '54244bd9-9f5d-454d-bfd6-924807312be7'
                },
                {
                  buildHookId: '6104f88aac082896a234da03',
                  title: 'Website',
                  name: 'parqwood',
                  apiId: 'f873f803-7f82-4ba3-b0b6-b5cdad5212e5'
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
