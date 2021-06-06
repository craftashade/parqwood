import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Article from "../components/article";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { toPlainText } from "../lib/helpers";

export const query = graphql`
  query ArticleTemplateQuery($id: String!) {
    article: sanityArticle(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
      }
      mainImage {
        ...SanityImage
        alt
      }
      title
      slug {
        current
      }
      _rawExcerpt(resolveReferences: { maxDepth: 5 })
      _rawBody(resolveReferences: { maxDepth: 5 })
      authors {
        _key
        author {
          image {
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
            }
          }
          name
        }
      }
    }
  }
`;

const ArticleTemplate = props => {
  const { data, errors } = props;
  const article = data && data.article;
  return (
    <Layout textWhite={true}>
      {errors && <SEO title="GraphQL Error" />}
      {article && (
        <SEO
          title={article.title || "Untitled"}
          description={toPlainText(article._rawExcerpt)}
          image={article.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {article && <Article {...article} />}
    </Layout>
  );
};

export default ArticleTemplate;