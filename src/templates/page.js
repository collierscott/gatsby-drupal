import React from "react"
import { graphql } from 'gatsby'
import { Breadcrumbs, Container, Link, Typography } from "@material-ui/core"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

class PageTemplate extends React.Component {
  render() {
    console.log(this.props.data)
    const page = this.props.data.page
    const summary = page.body.processed.substring(0, 180);

    return (
      <Layout>
        <SEO
          title={page.title} 
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
                <Typography color="textPrimary">{page.title}</Typography>
            </Breadcrumbs>
            <h4>{page.title}</h4>
            <div dangerouslySetInnerHTML={{__html: page.body.processed }} />
        </Container>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($slug: String!)
  {
    page: nodePage(fields: { slug: { eq: $slug } }) {
        internalId: drupal_internal__nid
        body {
            format
            processed
            value
        }
        title
        status
        path {
            alias
        }
    }
  }
`