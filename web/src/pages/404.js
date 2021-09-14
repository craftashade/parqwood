import React from "react";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import { graphql, Link } from "gatsby";
import Container from "../components/container";

export const query = graphql`
  query NotFoundQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)frontpage/" }) {
      ...PageInfo
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
    productCategories: allSanityProductCategory {
      nodes {
        title
        products {
          title
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

const NotFoundPage = (props) => {
  const { data } = props;
  return (
    <Layout textWhite={false} data={data}>
      <Container>
        <SEO title="404: Not found" />
        <div className="font-body my-24">
          <h1 className="text-5xl text-center font-bold text-primary mb-12">Page not found</h1>
          <div className="w-full text-center">
            <Link to="/" className="text-primary border border-primary rounded-2xl px-12 py-4 font-bold text-sm hover:bg-primary hover:text-white">Back to Home</Link>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default NotFoundPage;