
import React from "react"
import { graphql } from "gatsby"
import { Container, Link } from "@material-ui/core"
import Layout from "../components/Layout"

const Recipes = ({ data }) => (
    <Layout>
      <Container>
        <h1>Recipes</h1>
        <ul>
          {data.recipes.edges.map(({ node }) => (
            <li key={node.fields.slug}>
              <Link href={node.fields.slug}>{node.title}</Link>
            </li>
          ))} 
        </ul>
      </Container>
    </Layout>
  )
  
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
          }
        }
      }
    }
  `