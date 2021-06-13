import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ServiceCategory from "../components/serviceCategory";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { toPlainText } from "../lib/helpers";

export const query = graphql`
  query ServiceCategoryTemplateQuery($title: String!, $ids: [String]) {
    frontpage: sanityPage(title: {eq: "Frontpage"}) {
      ...PageInfo
    }
    serviceCategory: sanityServiceCategory(title: {eq: $title}) {
      description
      title
      image {
        image {
        ...SanityImage
        }
      }
    }
    servicesForRows: allSanityService(filter: {id: { in: $ids }}) {
      nodes {
        id
        thumbnail {
          image {
            ...SanityImage
          }
        }
        title
        excerpt
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
    categories: allSanityServiceCategory {
      nodes {
        title
        image {
          image {
            ...SanityImage
          }
        }
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
      }
    }
  }
`;

const ServiceCategoryTemplate = props => {
  const { data, errors } = props;
  const services = data && data.services;
  const serviceCategory = data && data.serviceCategory;
  return (
    <Layout showNav={true} data={data} textWhite={false}>
      {errors && <SEO title="GraphQL Error" />}
      {serviceCategory && (
        <SEO
          title={serviceCategory.title || "Untitled"}
          description={serviceCategory.description}
          image={serviceCategory.image.image}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {serviceCategory && <ServiceCategory data={data} />}
    </Layout>
  );
};

export default ServiceCategoryTemplate;
