import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Article from "../components/article";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { toPlainText } from "../lib/helpers";

export const query = graphql`
  query ArticleTemplateQuery($id: String!) {
    article: sanityArticle(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
      }
      mainImage {
        ...SanityImage
        alt
      }
      title
      slug {
        current
      }
      _rawExcerpt(resolveReferences: { maxDepth: 5 })
      _rawBody(resolveReferences: { maxDepth: 5 })
      authors {
        _key
        author {
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
          }
          name
        }
      }
      openGraph {
        description
        title
        keywords
        image {
          ...SanityImage
        }
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      openGraph {
        title
        description
        image {
          ...SanityImage
        }
      }
      _rawAddress
      addressLink
      mobile
      tel
      email
      banner {
        color {
          rgb {
            r
            g
            b
            a
          }
        }
        message
        page {
          ... on SanityRoute {
            slug {
              current
            }
          }
        }
        url
      }
    }
    navs: allSanityNavigationMenu {
      edges {
        node {
          title
          ...NavMenu
        }
      }
    }
    services: allSanityService {
      nodes {
        title
        serviceCategory {
          title
        }
      }
    }
    serviceCategories: allSanityServiceCategory {
      nodes {
        title
        services {
          title
        }
      }
    }
    categories: allSanityServiceCategory {
      nodes {
        title
        image {
          image {
            ...SanityImage
          }
        }
        _rawImage(resolveReferences: {maxDepth: 10})
      }
    }
    projects: allSanityProject {
      nodes {
        images {
          image {
            ...SanityImage
          }
        }
        thumbnail {
          image {
            ...SanityImage
          }
        }
        title
        _rawThumbnail(resolveReferences: {maxDepth: 10})
      }
    }
  }
`;

const ArticleTemplate = props => {
  const { data, errors } = props;
  const article = data && data.article;
  return (
    <Layout showNav={true} data={data} textWhite={false}>
      {errors && <SEO title="GraphQL Error" />}
      {article && (
        <SEO
          title={article.openGraph.title || article.title || "Untitled"}
          description={article.openGraph.description || toPlainText(article._rawExcerpt)}
          image={article.openGraph.image || article.mainImage}
          keywords={article.openGraph.keywords.split(',').map(k => k.trim()) || []}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {article && <Article {...article} />}
    </Layout>
  );
};

export default ArticleTemplate;
