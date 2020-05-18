import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image"
import { Breadcrumbs, Container, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/CardMedia';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Layout from "../components/Layout"
import SEO from "../components/Seo"

class RecipeTemplate extends React.Component {
  render() {
    console.log(this.props.data)
    let recipe = this.props.data.recipe

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
            <Link color="inherit" href="/recipes">
              Recipes
            </Link>
            <Typography color="textPrimary">{recipe.title}</Typography>
          </Breadcrumbs>
          <Paper>
            <h1>{recipe.title}</h1>
            <Grid item xs={12} item={true}> 
              <Img fluid={image} />
            </Grid> 
            <h4>
              Difficulty:  {recipe.difficulty}
            </h4>
            <p>
              <div dangerouslySetInnerHTML={{__html: recipe.summary.processed }} />
            </p>
            <div>
              <h3>Ingredients</h3>
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
          </Paper>
        </Container>
      </Layout>
    )
  }
}

export default RecipeTemplate

export const pageQuery = graphql`
  query($slug: String!)
  {
    recipe: nodeRecipe(fields: { slug: { eq: $slug } }) {
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