import S from '@sanity/desk-tool/structure-builder'
import { MdMenu } from "react-icons/md"
import { GoBrowser as PageIcon, GoHome, GoSettings, GoTools } from "react-icons/go"
import articles from './src/structure/articles'
import landingPages from './src/structure/landingPages'
import PreviewIFrame from './src/components/previewIFrame'

const hiddenDocTypes = (listItem) =>
  !['route', 'navigationMenu', 'article', 'page', 'siteSettings', 'author', 'category', 'service', 'serviceCategory'].includes(
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
        .title('Services')
        .icon(GoTools)
        .child(
          S.list()
          .title('Services')
          .items([
            S.documentTypeListItem('service').title('Services').icon(GoTools),
            S.divider(),
            S.documentTypeListItem('serviceCategory').title('Service Categories').icon(GoTools),
          ]),
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
