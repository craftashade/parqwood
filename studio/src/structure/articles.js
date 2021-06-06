import S from '@sanity/desk-tool/structure-builder'
import {
  GoMegaphone as ArticlesIcon,
  GoChecklist as ApprovedIcon,
  GoEye as ReviewIcon,
  GoCircleSlash as RejectedIcon,
  GoArchive as AllIcon,
  GoPerson as AuthorIcon,
} from "react-icons/go"

import PreviewIFrame from '../components/previewIFrame'

export const icons = {
  ArticlesIcon,
  ApprovedIcon,
  ReviewIcon,
  RejectedIcon,
  AllIcon,
}

const articles = S.listItem()
  .title('Articles')
  .icon(ArticlesIcon)
  .child(
    S.list()
      .title('Articles')
      .items([
        S.listItem()
          .title('Published articles')
          .schemaType('article')
          .icon(ArticlesIcon)
          .child(
            S.documentList('article')
              .title('Published articles')
              .menuItems(S.documentTypeList('article').getMenuItems())
              // Only show articles with publish date earlier than now and that is not drafts
              .filter('_type == "article" && publishedAt < now() && !(_id in path("drafts.**"))')
              .child((documentId) =>
                S.document()
                  .documentId(documentId)
                  .schemaType('article')
                  .views([S.view.form(), PreviewIFrame()])
              )
          ),
        S.documentTypeListItem('article').title('All articles').icon(AllIcon),
        S.listItem()
          .title('Articles by category')
          .child(
            // List out all categories
            S.documentTypeList('category')
              .title('Articles by category')
              .child(catId =>
                // List out project documents where the _id for the selected
                // category appear as a _ref in the project’s categories array
                S.documentList()
                  .schemaType('article')
                  .title('Articles')
                  .filter(
                    '_type == "article" && $catId in categories[]._ref'
                  )
                  .params({ catId })
              )
        ),
        S.divider(),
        S.documentTypeListItem('author').title('Authors').icon(AuthorIcon),
        S.documentTypeListItem('category').title('Categories')
      ])
  )

export default articles
