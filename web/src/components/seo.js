import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";

const buttonOptions = {
  facebook: "913015825427987", // Facebook page ID
  facebook_chat: true, // Facebook customer chat
  whatsapp: "+65 88836588", // WhatsApp number
  call_to_action: "Contact us", // Call to action
  button_color: "#FF318E", // Color of button
  position: "right", // Position may be 'right' or 'left'
  order: "facebook,whatsapp", // Order of buttons
};

// https://ogp.me

function SEO({ description, lang, meta, keywords, title, image, bodyAttr, gradient }) {
  useLayoutEffect(() => {
    // const proto = document.location.protocol, 
    //   host = "getbutton.io", 
    //   url = proto + "//static." + host
    // const s = document.createElement('script')
    // s.type = 'text/javascript'
    // s.async = true
    // s.src = url + '/widget-send-button/js/init.js'
    // s.onload = function () {
    //   WhWidgetSendButton.init(host, proto, buttonOptions)
    // }
    // document.body.appendChild(s);

    // return () => {
    //   document.body.removeChild(s);
    // }
  }, [])
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = description || (data.site && data.site.description) || "";
        const siteTitle = (data.site && data.site.title) || "";
        const siteAuthor = (data.site && data.site.author && data.site.author.name) || "";
        const metaImage =
          image && image.asset
            ? imageUrlFor(buildImageObj(image))
              .width(1200)
              .url()
            : "";

        const pageTitle = title || siteTitle;

        return (
          <Helmet
            bodyAttributes={bodyAttr}
            htmlAttributes={{ lang }}
            title={pageTitle}
            titleTemplate={pageTitle === siteTitle ? siteTitle : `%s | ${siteTitle}`}
            meta={[
              {
                name: "google-site-verification",
                content: "SU4n497uKGn_qifcwZ-qJp1olxpkTwQ3q5js4DkUn44"
              },
              {
                name: "description",
                content: metaDescription
              },
              {
                property: "og:title",
                content: title
              },
              {
                property: "og:description",
                content: metaDescription
              },
              {
                property: "og:type",
                content: "website"
              },
              {
                property: "og:image",
                content: metaImage
              },
              {
                name: "twitter:card",
                content: "summary"
              },
              {
                name: "twitter:creator",
                content: siteAuthor
              },
              {
                name: "twitter:title",
                content: title
              },
              {
                name: "twitter:description",
                content: metaDescription
              }
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                    name: "keywords",
                    content: keywords.join(", ")
                  }
                  : []
              )
              .concat(meta)}
          >
            {gradient && gradient.from && gradient.to && (
              <style type="text/css">{`
              .gradient {
                background: linear-gradient(90deg, ${gradient.from} 0%, ${gradient.to} 100%);
              }
            `}</style>
            )}
            {
              data.site.favicon && data.site.favicon.asset && data.site.favicon.asset.url &&
              <link rel="icon" type="image/png" href={data.site.favicon.asset.url} sizes="16x16" />
            }
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: []
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      favicon {
        asset {
          url
        }
      }
      openGraph {
        title
        description
        keywords
      }
    }
  }
`;
