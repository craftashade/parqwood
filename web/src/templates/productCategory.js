import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProductCategory from "../components/productCategory";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { toPlainText } from "../lib/helpers";

export const query = graphql`
  query ProductCategoryTemplateQuery {
    frontpage: sanityPage(title: {eq: "Frontpage"}) {
      ...PageInfo
    }
    productCategories: allSanityProductCategory {
      nodes {
        title
        products {
          productName
          image {
            image {
              ...SanityImage
            }
          }
          _rawText
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

const ProductCategoryTemplate = props => {
  const { data, errors } = props;
  return (
    <Layout showNav={true} data={data} textWhite={false}>
      {errors && <SEO title="GraphQL Error" />}
      <SEO
        title={"Our Products"}
        description={"Our Products"}
        keywords={["product"]}
      />

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      <ProductCategory data={data} />
    </Layout>
  );
};

export default ProductCategoryTemplate;
