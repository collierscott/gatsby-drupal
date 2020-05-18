
import React from "react"
import { graphql } from "gatsby"
import { Container } from "@material-ui/core"
import Layout from "../components/Layout"
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/CardMedia';
import Teaser from '../components/Teaser';

const Articles = ({ data }) => {
  const items = data.articles.edges;
  return (
    <Layout>
      <Container maxWidth="lg">
          <Paper>
            <h1>Articles</h1>
            <Grid container spacing={4}>
            {
              items && items.map(item => 
                <Teaser key={item.node.id} item={item} buttonTitle='View Article' buttonIcon={<DoubleArrowIcon />} />
              )
            }
            </Grid>
          </Paper>
      </Container>
    </Layout>
  )
}
  
export default Articles

export const query = graphql`
  query {
    articles: allNodeArticle(limit: 1000) {
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
            field_tags {
              name
              path {
                alias
              }
            }
          }
        }
      }
    }
  }
`