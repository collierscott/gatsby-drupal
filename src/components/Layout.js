/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import SEO from "../components/SEO"
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Grid } from "@material-ui/core"
import Footer from "./Footer"
import Header from "./Header"
import "./css/Layout.css"

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
    { title: 'Home', url: '/' },
    { title: 'Articles', url: '/articles/' },
    { title: 'Recipes', url: '/recipes/' },
    { title: 'About', url: '/about-umami' },
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
      <Grid xs={12} item={true}>
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
