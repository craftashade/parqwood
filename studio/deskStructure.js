import S from '@sanity/desk-tool/structure-builder'
import { GoBrowser as PageIcon, GoHome, GoSettings, GoTools } from 'react-icons/go'
import { BiCamera } from 'react-icons/bi'
import articles from './src/structure/articles'
import landingPages from './src/structure/landingPages'
import PreviewIFrame from './src/components/previewIFrame'

const hiddenDocTypes = (listItem) =>
  !['route', 'navigationMenu', 'article', 'page', 'siteSettings', 'author', 'category', 'product', 'productCategory', 'project'].includes(
    listItem.getId()
  )

export default () =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem()
        .schemaType('siteSettings')
        .title('Site settings')
        .icon(GoSettings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .views([S.view.form(), PreviewIFrame()])
        ),
      S.documentListItem()
        .title('Frontpage')
        .schemaType('page')
        .icon(GoHome)
        .child(
          S.document()
            .schemaType('page')
            .documentId('frontpage')
            .views([S.view.form(), PreviewIFrame()])
        ),
      articles,
      landingPages,
      S.listItem()
        .title('Products')
        .icon(GoTools)
        .child(
          S.list()
          .title('Products')
          .items([
            S.documentTypeListItem('product').title('Products').icon(GoTools),
            S.divider(),
            S.documentTypeListItem('productCategory').title('Product Categories').icon(GoTools),
          ]),
        ),
      S.documentTypeListItem('project').title('Projects').icon(BiCamera),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
