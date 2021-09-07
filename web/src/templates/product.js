import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Product from "../components/product";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { toPlainText } from "../lib/helpers";

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    frontpage: sanityPage(title: {eq: "Frontpage"}) {
      ...PageInfo
    }
    productCategories: allSanityProductCategory {
      nodes {
        title
        products {
          title
        }
      }
    }
    product: sanityProduct(id: { eq: $id }) {
      id
      image {
        image {
          ...SanityImage
        }
      }
      _rawLogo(resolveReferences: {maxDepth: 10})
      _rawImage(resolveReferences: {maxDepth: 10})
      productName
      title
      _rawText
      productCategory {
        title
      }
      bgColor {
        hex
      }
      flooringSelectionTitle
      flooringSelectionColumns {
        title
        illustration {
          image {
            ...SanityImage
          }
        }
        _rawText
        flooringProperties {
          name
          _rawImage(resolveReferences: {maxDepth: 10})
        }
      }
      colorOptionTitle
      colorOptionGroups {
        name
        options {
          name
          _rawImage(resolveReferences: {maxDepth: 10})
        }
      }
      patternTitle
      patterns {
        name
        _rawImage(resolveReferences: {maxDepth: 10})
      }
      downloadTitle
      downloads {
        name
        _rawFile(resolveReferences: {maxDepth: 10})
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

const ProductTemplate = props => {
  const { data, errors } = props;
  const product = data && data.product;
  return (
    <Layout showNav={true} data={data} textWhite={false}>
      {errors && <SEO title="GraphQL Error" />}
      {product && (
        <SEO
          title={`${product.productCategory.title} | ${product.title}` || "Untitled"}
          description={toPlainText(product._rawText)}
          image={product.image ? product.image.image : ''}
          keywords={[product.productCategory.title, product.title]}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {product && <Product {...product} data={data} />}
    </Layout>
  );
};

export default ProductTemplate;
