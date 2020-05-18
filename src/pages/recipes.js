
import React from "react"
import { graphql } from "gatsby"
import { Container, Link } from "@material-ui/core"
import Layout from "../components/Layout"
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/CardMedia';
import Teaser from '../components/Teaser';

const Recipes = ({ data }) => {
  const items = data.recipes.edges;
  return (
    <Layout>
      <Container maxWidth="lg">
          <Paper>
            <h1>Recipes</h1>
            <Grid container spacing={4}>
            {
              items && items.map(item => 
                <Teaser key={item.node.id} item={item} buttonTitle='View Recipe' buttonIcon={<DoubleArrowIcon />} />
              )
            }
            </Grid>
          </Paper>

      </Container>
    </Layout>
  )
}
  
export default Recipes

export const query = graphql`
  query {
    recipes: allNodeRecipe(limit: 1000) {
      edges {
        node {
          title
          fields {
            slug
          }
          relationships {
            field_media_image {
              relationships {
                field_media_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 1100) {
                        src
                        srcSet
                        srcSetWebp
                        aspectRatio
                        originalName
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