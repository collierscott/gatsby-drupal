module.exports = {
  siteMetadata: {
    title: `Gatsby Drupal Starter`,
    description: `Kick off your next, great project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `Scott Collier <scollier@express-scripts.com>`,
  },
  plugins: [
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `http://localhost:9999`,
        apiBase: `api`, // optional, defaults to `jsonapi`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: false,
        disableMinification: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#14568d`,
        theme_color: `#14568d`,
        display: `minimal-ui`,
        icon: `src/images/express-scripts__logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
