import React from 'react'
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function IndexPage (props) {
    console.log(props.data);
    const useStyles = makeStyles({
      root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
    });
    const classes = useStyles();
    
    const pages = props.data.allNodeRecipe.edges;
    const pageTitles = pages.map(page => <li key={page.node.id}>{page.node.title}</li>);
    const recipeCount = props.data.allNodeRecipe.totalCount;
    const items = props.data.allNodeRecipe.edges;
    // const recipeList = recipes.map(recipe => <li key={recipe.node.id}><Link to={`/recipe/${recipe.node.id}/`}>{recipe.node.title}</Link></li>);

    return (
      <Layout>
        <SEO title="Home" />
        <ul>{pageTitles}</ul>
        There are {recipeCount} recipes.
        {
          items && items.map(item => 
            <Card className={classes.root}>
              <CardActionArea>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.node.title}
                </Typography>
                <CardMedia
                  className={classes.media}
                  image={item.node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid.src}
                />
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" href={`/recipe/${item.node.id}/`}>
                  View Recipe >>
                </Button>
              </CardActions>
            </Card>
          )
        }
      </Layout>
    );
}

export const query = graphql`
  {
    allNodeRecipe(sort: {order: ASC, fields: created}, limit: 10) {
      totalCount
      edges {
        node {
          id
          drupal_id
          title
          langcode
          summary: field_summary {
            processed
          }
          instructions: field_recipe_instruction {
            processed
          }
          ingredients: field_ingredients
          difficulty: field_difficulty
          createdAt: created(formatString: "DD-MM-YYYY")
          preparationTime: field_preparation_time
          cookingTime: field_cooking_time
          isPublished: status
          isFrontpage: promote
          isSticky: sticky
          created
          path {
            alias
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
                      }
                    }
                  }
                }
              }
            }
          }
          field_number_of_servings
          field_recipe_instruction {
            value
            format
            processed
          }
          field_summary {
            value
            format
            processed
          }
        }
      }
    }
  }
`