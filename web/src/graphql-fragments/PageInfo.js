import { graphql } from "gatsby";

export const PostInfo = graphql`
  fragment PageInfo on SanityPage {
    id
    navMenu {
      ...NavMenu
    }
    _rawContent(resolveReferences: { maxDepth: 10 })
    title
    breadcrumb
    ctaBlock
    featuresBlock
    openGraph {
      description
      title
      keywords
      image {
        ...SanityImage
      }
    }
  }
`;
