import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image"
import { Breadcrumbs, Container, Link, List, ListItem, ListItemText, Typography } from "@material-ui/core"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

class ArticleTemplate extends React.Component {
  render() {
    console.log(this.props.data)
    let item = this.props.data.article;

    console.log(item);

    const image = item.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid
    const summary = item.body.value.substring(0, 300);
    return (
      <Layout>
        <SEO
          title={item.title}
          lang="en"
          description={summary}
          meta={[
            { name: 'description', content: summary },
          ]}
        >
        <html lang="en"/>
        </SEO>
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Home
            </Link>
            <Link color="inherit" href="/articles">
              Articles
            </Link>
            <Typography color="textPrimary">{item.title}</Typography>
          </Breadcrumbs>
          <h4>{item.title}</h4>
          <div>
            <Img fluid={image} />
          </div>
          <div dangerouslySetInnerHTML={{__html: item.body.processed }} />
          <div>
            <List component="nav" aria-label="tags" dense>
              {item.tags &&
                item.tags.map((tag, i) =>
                  <ListItem key={i}>
                    <ListItemText>
                      {tag}
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

export default ArticleTemplate

export const pageQuery = graphql`
  query($slug: String!)
  {
    article: nodeArticle(fields: { slug: { eq: $slug } }) {
      id
      drupal_id
      body {
        format
        processed
        value
      }
      title
      relationships {
        field_tags {
          path {
            alias
          }
          name
        }
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