import React from "react"
import Link from "gatsby-link"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"

//import { rhythm } from "../utils/typography"

class ArticleTemplate extends React.Component {
  render() {
    console.log(this.props.data)
    let recipe = this.props.data.nodeRecipe

    const image = recipe.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid.src
    
    const listItems = recipe.ingredients.map((ingredient, i) =>
      <li key={i}>{ingredient}</li>

    )
    return (
      <Layout>
        <SEO title={recipe.title} />
        <Link
          to="/"
        >
          ← Back
        </Link>
        <h4>{recipe.title}</h4>
        <div>
          <img src={image} />
        </div>
        <div>
          {recipe.difficulty}
        </div>
        <div>
          <ul>
            {listItems}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default ArticleTemplate

export const pageQuery = graphql`
  query recipe($id: String)
  {
    nodeRecipe(id: {eq: $id}) {
      id
      drupal_id
      ingredients: field_ingredients
      difficulty: field_difficulty
      createdAt: created(formatString: "DD-MM-YYYY")
      preparationTime: field_preparation_time
      cookingTime: field_cooking_time
      isPublished: status
      title
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
`