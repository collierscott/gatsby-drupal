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
  if (node.internal.type === `node__recipe`) {
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
      }
      `
    ).then(result => {
      console.log(result);
      if (result.errors) {
        reject(result.errors)
      }

      // Create HN story pages.
      const recipeTemplate = path.resolve(`./src/templates/recipe.js`)
      // We want to create a detailed page for each
      // article node. We'll just use the Drupal NID for the slug.
      _.each(result.data.recipes.edges, edge => {
        console.log("++++++++++++++++++++++++++++");
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        console.log(edge);
        console.log("Creating pages");
        console.log(edge.node.path.alias);
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

      resolve()
    })
  })
}