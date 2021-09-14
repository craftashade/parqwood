import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import ArticlePreviewList from "../components/article-preview-list";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
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
      openGraph {
        description
        title
        keywords
        image {
          ...SanityImage
        }
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
    articles: allSanityArticle(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
    products: allSanityProduct {
      nodes {
        title
        productCategory {
          title
        }
      }
    }
    productCategories: allSanityProductCategory {
      nodes {
        title
        products {
          title
        }
      }
    }
    categories: allSanityProductCategory {
      nodes {
        title
      }
    }
    projects: allSanityProject {
      nodes {
        projects {
          image {
            image {
              ...SanityImage
            }
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

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const articleNodes = (data || {}).articles
    ? mapEdgesToNodes(data.articles)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    console.warn(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const { title, description, keywords } = site.openGraph || {}
  const kw = keywords || ""

  return (
    <Layout textWhite={false} data={data}>
      <SEO
        title={title || site.title || "Missing title"}
        description={description || "Missing description"}
        keywords={kw.split(',').map(k => k.trim())}
      />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <div className="py-6">{articleNodes && <ArticlePreviewList nodes={articleNodes} />}</div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
