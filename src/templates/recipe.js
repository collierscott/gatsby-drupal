import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image"
import { Breadcrumbs, Container, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Layout from "../components/Layout"
import SEO from "../components/Seo"

class RecipeTemplate extends React.Component {
  render() {
    console.log(this.props.data)
    let recipe = this.props.data.nodeRecipe

    const image = recipe.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid

    return (
      <Layout>
        <SEO
          title={recipe.title}
          lang="en"
          description={recipe.summary.value}
          meta={[
            { name: 'description', content: recipe.summary.value },
          ]}
        >
        <html lang="en"/>
        </SEO>
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Home
            </Link>
            <Link color="inherit" href="/recipe">
              Recipes
            </Link>
            <Typography color="textPrimary">{recipe.title}</Typography>
          </Breadcrumbs>
          <h4>{recipe.title}</h4>
          <div>
            <Img fluid={image} />
          </div>
          <div>
            {recipe.difficulty}
          </div>
          <div dangerouslySetInnerHTML={{__html: recipe.summary.processed }} />
          <div>
            <List component="nav" aria-label="ingredients" dense>
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, i) =>
                  <ListItem key={i}>
                    <ListItemIcon>
                      <CheckBoxOutlineBlankIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {ingredient}
                    </ListItemText>
                  </ListItem>
                )
              }
            </List>
          </div>
        </Container>
      </Layout>
    )
  }
}

export default RecipeTemplate

export const pageQuery = graphql`
  query recipe($id: String)
  {
    nodeRecipe(id: {eq: $id}) {
      id
      drupal_id
      summary: field_summary {
        value
        processed
      }
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
                  fluid(maxWidth: 470, maxHeight: 353) {
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