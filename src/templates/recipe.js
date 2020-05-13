import React from "react"
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { Breadcrumbs, Button, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

class ArticleTemplate extends React.Component {
  render() {
    console.log(this.props.data)
    let recipe = this.props.data.nodeRecipe

    const image = recipe.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid.src
    
    const listItems = recipe.ingredients.map((ingredient, i) =>
      <ListItem key={i}>
        <ListItemIcon>
          <CheckBoxOutlineBlankIcon />
        </ListItemIcon>
        <ListItemText>
          {ingredient}
        </ListItemText>
      </ListItem>

    )
    return (
      <Layout>
        <Helmet
          title={recipe.title}
          meta={[
            { name: 'description', content: recipe.summary.value },
          ]}
        >
        <html lang="en"/>
      </Helmet>
        <SEO title={recipe.title} />
        <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">{recipe.title}</Typography>
        </Breadcrumbs>
        <h4>{recipe.title}</h4>
        <div>
          <img src={image} />
        </div>
        <div>
          {recipe.difficulty}
        </div>
        <div dangerouslySetInnerHTML={{__html: recipe.summary.processed }} />
        <div>
          <List component="nav" aria-label="ingredients" dense>
            {listItems}
          </List>
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