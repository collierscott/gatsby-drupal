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
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Container, Grid } from "@material-ui/core"
import Footer from "./footer"
import Header from "./header"
import "./css/layout.css"

const Layout = ({ children }) => {

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const sections = [
    { title: 'Articles', url: '#' },
    { title: 'Recipes', url: '/recipe/' },
    { title: 'About', url: '/about/' },
  ];

  const mainStyle = {
    paddingBottom: '25px',
  };

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
      <Grid xs={12}>
        <Header title={data.site.siteMetadata.title} sections={sections} />
        <Box component="main" style={mainStyle}>{children}</Box>
      </Grid>
      <Footer title={data.site.siteMetadata.title} description=""/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
