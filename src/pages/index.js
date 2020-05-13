import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from 'gatsby'

class IndexPage extends React.Component {

  render() {
    console.log(this.props.data);

    const pages = this.props.data.allNodeRecipe.edges;
    const pageTitles = pages.map(page => <li key={page.node.id}>{page.node.title}</li>);
    const recipeCount = this.props.data.allNodeRecipe.totalCount;
    const recipes = this.props.data.allNodeRecipe.edges;
    const recipeList = recipes.map(recipe => <li key={recipe.node.id}><Link to={`/recipe/${recipe.node.id}/`}>{recipe.node.title}</Link></li>);

    return (
      <Layout>
        <SEO title="Home" />
        <ul>{pageTitles}</ul>
        There are {recipeCount} recipes.
        <ul>{recipeList}</ul>
      </Layout>
    );
  }
}

export default IndexPage

export const query = graphql`
  {
    allNodeRecipe(sort: {order: ASC, fields: created}, limit: 10)  {
      edges {
        node {
          id
          drupal_id
          ingredients: field_ingredients
          difficulty: field_difficulty
          createdAt: created(formatString: "DD-MM-YYYY")
          preparationTime: field_preparation_time
          cookingTime: field_cooking_time
          isPublished: status
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
                    childImageSharp {
                      fluid(maxWidth: 1100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
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