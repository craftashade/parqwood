import React from "react"
import { format, isFuture } from "date-fns";
import { getGatsbyImageData } from "gatsby-source-sanity";
import clientConfig from "../../client-config";
import { GatsbyImage } from "gatsby-plugin-image";

export function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map(edge => edge.node);
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(publishedAt);
}

export function getBlogUrl(slug) {
  return `/blog/${slug.current || slug}/`;
}

export function buildImageObj(source = { asset: {} }) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

export function toPlainText(blocks) {
  if (!blocks) {
    return "";
  }
  return blocks
    .map(block => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map(child => child.text).join("");
    })
    .join("\n\n");
}

export const maybeIllustration = (illustration, maxWidth) => {
  let img = null;
  if (
    illustration &&
    illustration.disabled !== true &&
    illustration.image &&
    illustration.image.asset
  ) {
    const imageData = getGatsbyImageData(
      illustration.image,
      { maxWidth: maxWidth || 960 },
      clientConfig.sanity
    );

    img = (
      <GatsbyImage
        className="w-full mx-auto"
        image={imageData}
        alt={illustration.image.alt}
      />
    );
  }
  return img;
};

export const maybeImage = (image, imgStyles, classes, maxWidth) => {
  let img = null;
  if (image && image.asset) {
    const imageData = getGatsbyImageData(
      image,
      { maxWidth: maxWidth || 960 },
      clientConfig.sanity
    );

    if (imageData.images.sources.length && imageData.images.sources[0].type.includes('svg')) {
      const set = imageData.images.sources[0]
      img = <img src={set.srcSet.split(' ')[0]} className="mx-auto" />
    } else {
      img = (
        <GatsbyImage
          className={classes}
          image={imageData}
          alt="CTA image"
          style={imgStyles}
        />
      );
    }
  }
  return img;
};

export const getHref = (item) => {
  if (!item) return "#"
  let link = item.route || item.link || "#";
  if (
    item.landingPageRoute &&
    item.landingPageRoute.slug &&
    item.landingPageRoute.slug.current
  ) {
    link = item.landingPageRoute.slug.current;
  }
  return link
}