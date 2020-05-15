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
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `node__recipe`) {
    const slug = `/recipes/${node.drupal_internal__nid}/`
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
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Drupal graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    graphql(
      `{
        allNodeRecipe {
          edges {
            node {
              id
              drupal_id
              title
              created
              path {
                alias
              }
              relationships {
                field_media_image {
                  relationships {
                    field_media_image {
                      localFile {
                        absolutePath
                      }
                    }
                  }
                }
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
      const recipeTemplate = path.resolve(`./src/templates/recipe.js`)
      // We want to create a detailed page for each
      // article node. We'll just use the Drupal NID for the slug.
      _.each(result.data.allNodeRecipe.edges, edge => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        createPage({
          // Each page is required to have a `path` as well
          // as a template component. The `context` is
          // optional but is often necessary so the template
          // can query data specific to each page.
          path: `/recipe/${edge.node.id}/`,
          component: slash(recipeTemplate),
          context: {
            id: edge.node.id,
          },
        })
      })

      resolve()
    })
  })
}