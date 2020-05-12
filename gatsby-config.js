module.exports = {
  siteMetadata: {
    title: `Express Scripts Drupal Starter`,
    description: `Kick off your next, great project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `Scott Collier <scollier@express-scripts.com>`,
  },
  plugins: [
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `http://localhost:8989`,
        apiBase: `api`, // optional, defaults to `jsonapi`
      },
    },
    // {
    //   resolve: `gatsby-source-contenta`,
    //   options: {
    //     baseUrl: `http://localhost:8989`
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
