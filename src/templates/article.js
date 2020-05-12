import React from "react"
import Link from "gatsby-link"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"

//import { rhythm } from "../utils/typography"

class ArticleTemplate extends React.Component {
  render() {
    console.log(this.props.data)
    const recipe = this.props.data.recipes
    const image = recipe.relationships.image.relationships.imageFile

    console.log(recipe)
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
          <img src={image.localFile.childImageSharp.fluid.src} />
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
  query articleQuery($id: String!) {
    recipes(id: { eq: $id }) {
        title
        createdAt(formatString: "DD-MMM-YYYY")
        ingredients
        difficulty
        preparationTime
        instructions
        cookingTime
        isPublished
        relationships {
          image {
            relationships {
              imageFile {
                localFile {
                  childImageSharp {
                    fluid(maxWidth:1100) {
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