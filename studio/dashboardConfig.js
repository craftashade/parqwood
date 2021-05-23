export default {
  widgets: [
    {name: 'structure-menu'},
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
                  title: 'Blog Website',
                  name: 'craft-a-shade',
                  apiId: 'f042e0c0-e245-4801-8c6f-e782a466b681'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/abuuzayr/craft-a-shade',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://craft-a-shade.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
