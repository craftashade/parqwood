import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Service from "../components/service";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { toPlainText } from "../lib/helpers";

export const query = graphql`
  query ServiceTemplateQuery($id: String!) {
    frontpage: sanityPage(title: {eq: "Frontpage"}) {
      ...PageInfo
    }
    serviceCategories: allSanityServiceCategory {
      nodes {
        title
        services {
          title
        }
      }
    }
    service: sanityService(id: { eq: $id }) {
      id
      images {
        image {
          ...SanityImage
        }
      }
      _rawImages(resolveReferences: {maxDepth: 10})
      title
      _rawText
      serviceCategory {
        title
      }
      thumbnail {
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

const ServiceTemplate = props => {
  const { data, errors } = props;
  const service = data && data.service;
  return (
    <Layout showNav={true} data={data} textWhite={false}>
      {errors && <SEO title="GraphQL Error" />}
      {service && (
        <SEO
          title={`${service.serviceCategory.title} | ${service.title}` || "Untitled"}
          description={toPlainText(service._rawText)}
          image={service.thumbnail.image}
          keywords={[service.serviceCategory.title, service.title]}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {service && <Service {...service} data={data} />}
    </Layout>
  );
};

export default ServiceTemplate;
