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

async function createServicePages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityService {
        edges {
          node {
            id
            title
            serviceCategory {
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const serviceEdges = (result.data.allSanityService || {}).edges || [];
  serviceEdges
    .forEach(edge => {
      const { id, title, serviceCategory } = edge.node;
      const path = `${slugify(serviceCategory.title)}/${slugify(title)}/`;
      reporter.info(`Creating service page: ${path}`);
      createPage({
        path,
        component: require.resolve("./src/templates/service.js"),
        context: { id }
      });
    });

  // Create category pages
  const categoriesObj = serviceEdges.reduce((obj, edge) => {
    if (obj.hasOwnProperty(edge.node.serviceCategory.title)) {
      obj[edge.node.serviceCategory.title] = [...obj[edge.node.serviceCategory.title], edge.node.id]
    } else {
      obj[edge.node.serviceCategory.title] = [edge.node.id]
    }
    return obj
  }, {})

  Object.keys(categoriesObj)
    .forEach(category => {
      const ids = categoriesObj[category];
      const path = `${slugify(category)}/`;
      reporter.info(`Creating service category page: ${path}`);
      createPage({
        path,
        component: require.resolve("./src/templates/serviceCategory.js"),
        context: { title: category, ids }
      });
    });

}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createLandingPages("/", graphql, actions, reporter);
  await createArticlePages("/articles", graphql, actions, reporter);
  await createServicePages(graphql, actions, reporter);
};
