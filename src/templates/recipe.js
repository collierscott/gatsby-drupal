import React from "react"
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import Img from "gatsby-image"
import { Breadcrumbs, Container, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/CardMedia';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Layout from "../components/Layout"
import SEO from "../components/Seo"

class RecipeTemplate extends React.Component {

  render() {
    console.log(this.props.data);

    let recipe = this.props.data.recipe;

    const image = recipe.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid

    const bannerStyle = {
      flexGrow: 1,
      minHeight: '500px',
      alignItems: 'center',
      display: 'flex',
    };

    const summaryStyle = {
      color: '#fff',
      border: '1px solid #464646',
      background: 'rgba(0,0,0,0.42)',
      padding: '1.777em',
      marginTop: '20px',
    }

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
        </Container>
        <Container fluid>
          <Paper>
            <h1>{recipe.title}</h1>
            </Paper>
        </Container>
        <div style={bannerStyle}>
          <Grid item xs={12} item={true}> 
            <Img fluid={image} />
          </Grid> 
        </div>

        <Container maxWidth="lg">
          <Paper elevation={3}  style={summaryStyle}>
            <h4>
              Difficulty:  
            </h4>
            <p>{recipe.difficulty}</p>
            <p>
              <h4>Description</h4>
              <div dangerouslySetInnerHTML={{__html: recipe.summary.processed }} />
            </p>
          </Paper>
          <Paper elevation={3}>
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