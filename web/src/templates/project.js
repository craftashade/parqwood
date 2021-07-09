import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { toPlainText } from "../lib/helpers";

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
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
    project: sanityProject(id: { eq: $id }) {
      id
      title
      images {
        image {
          ...SanityImage
        }
      } 
      _rawImages(resolveReferences: {maxDepth: 10})
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

const ProjectTemplate = props => {
  const { data, errors } = props;
  const project = data && data.project;
  return (
    <Layout showNav={true} data={data} textWhite={false}>
      {errors && <SEO title="GraphQL Error" />}
      {project && (
        <SEO
          title={project.title || "Untitled"}
          description={project.title}
          image={project.thumbnail.image}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {project && <Project {...project} data={data} />}
    </Layout>
  );
};

export default ProjectTemplate;
