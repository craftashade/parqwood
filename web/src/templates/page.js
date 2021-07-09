import React, { useState } from "react";
import { graphql, Link } from "gatsby";

import Hero from "../components/hero";
import InfoRows from "../components/InfoRows";
import CTAColumns from "../components/cta-columns";
import CTA from "../components/cta";
import CTAWithImage from "../components/ctaWithImage";
import { TopWave, BottomWave } from "../components/wave";
import Services from "../components/Services"
import QuoteBlock from "../components/QuoteBlock"
import Features from "../components/Features"
import FullWidthImage from "../components/FullWidthImage"
import TextParagraph from "../components/TextParagraph"
import ContactForm from "../components/ContactForm"
import Brands from "../components/Brands"

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query PageTemplateQuery($id: String!) {
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
    route: sanityRoute(id: { eq: $id }) {
      slug {
        current
      }
      useSiteTitle
      page {
        ...PageInfo
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
      emailTo
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

const Page = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const page = data.page || data.route.page;

  const content = (page._rawContent || [])
    .filter(c => !c.disabled)
    .map((c, i) => {
      let el = null;
      switch (c._type) {
        case "services":
          el = <Services key={c._key} {...c} />;
          break;
        case "infoRows":
          el = <InfoRows key={c._key} {...c} />;
          break;
        case "hero":
          el = <Hero key={c._key} {...c} />;
          break;
        case "ctaColumns":
          el = <CTAColumns key={c._key} {...c} />;
          break;
        case "ctaPlug":
          el = <CTA key={c._key} {...c} />;
          break;
        case "ctaWithImage":
          el = <CTAWithImage key={c._key} {...c} />;
          break;
        case "quoteBlock":
          el = <QuoteBlock key={c._key} {...c} />;
          break;
        case "features":
          el = <Features key={c._key} {...c} />;
          break;
        case "fullWidthImage":
          el = <FullWidthImage key={c._key} {...c} />;
          break;
        case "textParagraph":
          el = <TextParagraph key={c._key} {...c} />;
          break;
        case "contactForm":
          el = <ContactForm key={c._key} {...c} siteData={site} />;
          break;
        case "brands":
          el = <Brands key={c._key} {...c} />;
          break;
        case "articles":
          // el = <div>articles"</div>;
          break;
        case "uiComponentRef":
          switch (c.name) {
            case "topWave":
              el = <TopWave />;
              break;
            case "bottomWave":
              el = <BottomWave />;
              break;
            default:
              break;
          }
          break;
        default:
          el = null;
      }
      return el;
    });

  const menuItems = page.navMenu && (page.navMenu.items || []);
  const pageTitle = data.route && !data.route.useSiteTitle && page.title;

  return (
    <Layout navMenuItems={menuItems} textWhite={!data.route} data={data} absolute={!data.route}>
      <SEO
        title={pageTitle}
        description={site.description}
        keywords={site.keywords}
      />
      <div className="font-body">
        { 
          page && page.breadcrumb && page.title &&
          <div className="my-8 text-gray-400 text-sm container mx-auto lg:w-5/6 w-11/12">
            <Link to="/">Home</Link>&nbsp;>&nbsp;<span className="font-semibold">{page.title}</span>
          </div>
        }
        {content}
        {
          data.route && 
          page.ctaBlock && 
          <CTA {...(data.frontpage ? data.frontpage._rawContent.find(c => c._type === 'ctaPlug') : [])} />
        }
        {
          data.route &&
          page.featuresBlock && 
          <Features {...(data.frontpage ? data.frontpage._rawContent.find(c => c._type === 'features') : [])}  />
        }
      </div>
    </Layout>
  );
};

export default Page;
