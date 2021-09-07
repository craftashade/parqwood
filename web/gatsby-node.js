const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').slice(0, 200)

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: "SanityArticle",
      interfaces: ["Node"],
      fields: {
        isPublished: {
          type: "Boolean!",
          resolve: source => new Date(source.publishedAt) <= new Date()
        }
      }
    })
  ]);
};

async function createLandingPages(pathPrefix = "/", graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityRoute(filter: { slug: { current: { ne: null } }, page: { id: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const routeEdges = (result.data.allSanityRoute || {}).edges || [];
  routeEdges.forEach(edge => {
    const { id, slug = {} } = edge.node;
    const path = [pathPrefix, slug.current, "/"].join("");
    reporter.info(`Creating landing page: ${path}`);
    createPage({
      path,
      component: require.resolve("./src/templates/page.js"),
      context: { id }
    });
  });
}

async function createArticlePages(pathPrefix = "/articles", graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityArticle(filter: { slug: { current: { ne: null } }, isPublished: { eq: true } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const articleEdges = (result.data.allSanityArticle || {}).edges || [];
  articleEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const { id, slug = {} } = edge.node;
      const path = `${pathPrefix}/${slug.current}/`;
      reporter.info(`Creating article page: ${path}`);
      createPage({
        path,
        component: require.resolve("./src/templates/article.js"),
        context: { id }
      });
    });
}

async function createProductPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityProduct {
        edges {
          node {
            id
            productName
            productCategory {
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const productEdges = (result.data.allSanityProduct || {}).edges || [];
  productEdges
    .forEach(edge => {
      const { id, productName, productCategory } = edge.node;
      const path = `${slugify(productCategory.title)}/${slugify(productName)}/`;
      reporter.info(`Creating product page: ${path}`);
      createPage({
        path,
        component: require.resolve("./src/templates/product.js"),
        context: { id }
      });
    });

  reporter.info(`Creating product category page`);
  createPage({
    path: 'products/',
    component: require.resolve("./src/templates/productCategory.js")
  });

}

async function createProjectPages(pathPrefix = "/projects", graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityProject {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.allSanityProject || {}).edges || [];
  projectEdges
    .forEach(edge => {
      const { id, title } = edge.node;
      const path = `${pathPrefix}/${slugify(title)}/`;
      reporter.info(`Creating project page: ${path}`);
      createPage({
        path,
        component: require.resolve("./src/templates/project.js"),
        context: { id }
      });
    });

  // create base projects page also
  if (projectEdges[0]) {
    createPage({
      path: pathPrefix,
      component: require.resolve("./src/templates/project.js"),
      context: { id: projectEdges[0].node.id }
    });
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createLandingPages("/", graphql, actions, reporter);
  await createArticlePages("/articles", graphql, actions, reporter);
  await createProductPages(graphql, actions, reporter);
  await createProjectPages("/projects", graphql, actions, reporter);
};
