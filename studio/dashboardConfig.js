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
                  buildHookId: '60a9c3588533be55fa23c9df',
                  title: 'Sanity Studio',
                  name: 'craft-a-shade-studio',
                  apiId: '269c6d8b-859c-42aa-84b8-2e7e155af605'
                },
                {
                  buildHookId: '60a9c358ceae0771c59444a7',
                  title: 'Website',
                  name: 'craft-a-shade',
                  apiId: 'f042e0c0-e245-4801-8c6f-e782a466b681'
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
