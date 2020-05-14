import React from "react"
import Link from "gatsby-link"
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from "../components/seo"

//import { rhythm } from "../utils/typography"

class ArticleTemplate extends React.Component {
  render() {
    console.log(this.props.data)
    let recipe = this.props.data.allNodeRecipe.edges

    if(recipe.length > 0) {
      recipe = recipe[0]
    }

    const image = recipe.node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid.src
    
    const listItems = recipe.node.ingredients.map((ingredient, i) =>
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
  query allNodeRecipe($id: String)
  {
    allNodeRecipe(filter: {id: {eq: $id}}) {
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