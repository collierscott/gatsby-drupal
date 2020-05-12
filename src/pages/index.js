import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from 'gatsby'

class IndexPage extends React.Component {

  render() {
    console.log(this.props.data);

    const pages = this.props.data.allArticles.edges;
    const pageTitles = pages.map(page => <li key={page.node.id}>{page.node.title}</li>);
    const recipeCount = this.props.data.allRecipes.totalCount;
    const recipes = this.props.data.allRecipes.edges;
    const recipeList = recipes.map(recipe => <li key={recipe.node.id}><Link to={`/recipe/${recipe.node.id}/`}>{recipe.node.title}</Link></li>);

    return (
      <Layout>
        <SEO title="Home" />
        <ul>{pageTitles}</ul>
        There are {recipeCount} recipes.
        <ul>{recipeList}</ul>
      </Layout>
    );
  }
}

export default IndexPage

export const query = graphql`
  query {
    allArticles {
      edges {
        node {
          id
          title
        }
      }
    }
    allRecipes(sort: {fields: [createdAt], order: DESC}, limit: 10) {
        totalCount
        edges {
            node {
                title
                id
                createdAt(formatString: "DD-MM-YYYY")
                relationships {
                    image {
                        relationships {
                        imageFile {
                            uri {
                                url
                                value
                            }
                            size
                            }
                        }
                    }
                }
            }
        }
    }
  }
`