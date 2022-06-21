import { format } from "date-fns";
import { Link } from "gatsby";
import React from "react";
import { buildImageObj, cn, getArticleUrl } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import PortableText from "./portableText";

import * as styles from "./article-preview.module.css";
import { responsiveTitle3 } from "./typography.module.css";

function ArticlePreview(props) {
  return (
    <Link
      className={`${props.isInList ? styles.inList : styles.inGrid} font-body`}
      to={getArticleUrl(props.slug.current)}
    >
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .auto("format")
              .url()}
            alt={props.mainImage.alt}
          />
        )}
      </div>
      <div className="mt-4 text-gray-500">{format(props.publishedAt, "MMMM Do, YYYY")}</div>
      <div className="mt-2">
        <h3 className="text-xl font-bold">{props.title}</h3>
        {props._rawExcerpt && (
          <div className="mt-2" style={{
            display: "-webkit-box",
            "-webkit-line-clamp": "3",
            "-webkit-box-orient": "vertical",
            overflow: "hidden"
          }}>
            <PortableText blocks={props._rawExcerpt} />
          </div>
        )}
      </div>
      <div className="mt-2 font-bold text-orange-500">Read more</div>
    </Link>
  );
}

export default ArticlePreview;
