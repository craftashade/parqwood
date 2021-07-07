import React from "react";
import { graphql } from "gatsby";
import Errors from "../components/errors";
import Page from "../templates/page";

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    alt
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
      metadata {
        lqip
        dimensions {
          aspectRatio
          width
          height
        }
      }
    }
  }

  query FrontpageQuery {
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
    }

    navs: allSanityNavigationMenu {
      edges {
        node {
          title
          ...NavMenu
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

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  return <Page data={data} />;
};

export default IndexPage;
