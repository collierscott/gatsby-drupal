/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import SEO from "../components/Seo"
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Container } from "@material-ui/core"
import Footer from "./footer"
import Header from "./header"
import "./css/layout.css"

const Layout = ({ children }) => {
  const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
  }));

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const classes = useStyles();

  const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
  ];

  return (
    <> 
      <SEO
        title={data.site.siteMetadata.title}
        lang="en"
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
        ]}
      >
      </SEO>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={data.site.siteMetadata.title} sections={sections} />
        <Box component="main">{children}</Box>
      </Container>
      <Footer title={data.site.siteMetadata.title} description=""/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
