import { Link } from "gatsby";
import React from "react";
import ArticlePreview from "./article-preview";

import * as styles from "./article-preview-list.module.css";

function ArticlePreviewGrid(props) {
  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {props.nodes &&
          props.nodes.map(node => (
            <div key={node.id}>
              <ArticlePreview {...node} />
            </div>
          ))}
      </div>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  );
}

ArticlePreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: ""
};

export default ArticlePreviewGrid;
