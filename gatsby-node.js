/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Create a slug for each recipe and set it as a field on the node.
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (
    node.internal.type === `node__recipe` ||
    node.internal.type === `node__page` ||
    node.internal.type === `node__article`
  ) {
    // const slug = `/recipe/${node.drupal_internal__nid}/`
    const slug = `${node.path.alias}/`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Drupal graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    graphql(
      `{
          recipes: allNodeRecipe {
            edges {
              node {
                internalId: drupal_internal__nid
                title
                path {
                  alias
                }
                fields {
                  slug
                }
              }
            }
          }
          articles: allNodeArticle {
            edges {
              node {
                internalId: drupal_internal__nid
                title
                path {
                  alias
                }
                fields {
                  slug
                }
              }
            }
          }
          pages: allNodePage {
            edges {
              node {
                internalId: drupal_internal__nid
                title
                path {
                  alias
                }
                fields {
                  slug
                }
              }
            }
          }
      }
      `
    ).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      // Create HN story pages.
      const recipeTemplate = path.resolve(`./src/templates/recipe.js`);
      const articleTemplate = path.resolve(`./src/templates/article.js`);
      const pageTemplate = path.resolve(`./src/templates/page.js`);

      // We want to create a detailed page for each
      // recipe node. We'll just use the Drupal NID for the slug.
      _.each(result.data.recipes.edges, edge => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        createPage({
          // Each page is required to have a `path` as well
          // as a template component. The `context` is
          // optional but is often necessary so the template
          // can query data specific to each page.
          path: edge.node.path.alias,
          component: recipeTemplate,
          context: {
            slug: edge.node.fields.slug,
          },
        })
      })

      _.each(result.data.articles.edges, edge => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        createPage({
          // Each page is required to have a `path` as well
          // as a template component. The `context` is
          // optional but is often necessary so the template
          // can query data specific to each page.
          path: edge.node.path.alias,
          component: articleTemplate,
          context: {
            slug: edge.node.fields.slug,
          },
        })
      })

      _.each(result.data.pages.edges, edge => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        createPage({
          // Each page is required to have a `path` as well
          // as a template component. The `context` is
          // optional but is often necessary so the template
          // can query data specific to each page.
          path: edge.node.path.alias,
          component: pageTemplate,
          context: {
            slug: edge.node.fields.slug,
          },
        })
      })

      resolve()
    })
  })
}