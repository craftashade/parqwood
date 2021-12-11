import { format, distanceInWords, differenceInDays } from "date-fns";
import React, { useState, useEffect } from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import PortableText from "./portableText";
import Container from "./container";
import { Link } from "gatsby";
import Spacer from "../components/BreadcrumbSpacer";

import * as styles from "./article.module.css";

const CopyIcon = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 6C4 4.89543 4.89543 4 6 4H15C16.1046 4 17 4.89543 17 6V15C17 16.1046 16.1046 17 15 17H6C4.89543 17 4 16.1046 4 15V6Z" stroke="currentColor" stroke-width="1.2" />
    <path d="M13 1H3C1.89543 1 1 1.89543 1 3V13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
  </svg>
)

function Article(props) {
  const { _rawBody, categories, title, mainImage, publishedAt } = props;
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (navigator && navigator.clipboard) {
      await navigator.clipboard.writeText(window && window.location && window.location.href)
    }
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }, [copied])
  
  return (
    <article className={styles.root}>
      {
        title &&
        <div className="my-8 text-grey text-sm container mx-auto lg:w-5/6 w-11/12">
          <Link to="/">Home</Link><Spacer />
          <Link to="/articles">Articles</Link><Spacer />
          <span className="font-semibold">{title}</span>
        </div>
      }
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit("crop")
              .auto("format")
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), "MMMM Do, YYYY")}
              </div>
            )}
            <h1 className={styles.title}>{title}</h1>
            {categories && (
              <div className={styles.categories}>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
            {_rawBody && <PortableText blocks={_rawBody} isArticle />}
          </div>
        </div>
        <div className="my-10 text-center text-primary">
          share this article
          <div>
            <button className="outline-none px-6 py-4 font-bold border-primary border rounded-2xl m-2 text-sm hover:text-white hover:bg-primary" onClick={copy}>
              <div className="flex">
                { 
                  copied ? 
                  <>Article link copied!</> : 
                  <>
                    <CopyIcon className="mr-2" />Copy &amp; share article link
                  </>
                }
              </div>
            </button>
          </div>
        </div>
      </Container>
    </article>
  );
}

export default Article;
