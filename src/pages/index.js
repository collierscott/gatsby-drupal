import React from 'react'
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Carousel from "react-material-ui-carousel"
import Paper from '@material-ui/core/CardMedia';
import { Container } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import cleanBlockUrl from '../util/utilities';

export default function IndexPage ({ data }) {
    console.log(data);

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      card: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }));

    const classes = useStyles();
    const banners = data.allBlockContentBannerBlock.edges;
    const items = data.allNodeRecipe.edges;

    const viewRecipeStyle = {
      marginRight: 0,
      marginLeft: 'auto'
    };

    const bannerStyle = {
      minHeight: '500px',
      color: '#ffffff',
    };

    return (
      <Layout>
        <SEO title="Home" />
        <div className={classes.root}>
          <Grid item xs={12} item={true}>       
            <Carousel autoPlay={false}>
            {
              banners && banners.map(banner => {
                const b = banner.node;

                const uri = cleanBlockUrl(b.field_content_link.uri);

                const item = {
                  name: b.title,
                  description: b.summary,
                  image: b.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid.src,
                  uri: uri,
                  uri_title: b.field_content_link.title
                }
                return (
                  <Item item={item} key={b.id} style={bannerStyle} />
                )
              })
            }
            </Carousel>
          </Grid>
        </div>
        <Container maxWidth="lg">
          <Paper>
            <Grid container spacing={4}>
            {
              items && items.map(item => 
                <Grid item key={item.node.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardHeader
                      title={item.node.title}
                      subheader={item.node.createdAt}
                    />
                    
                      <CardMedia
                        className={classes.media}
                        alt={item.node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid.originalName}
                        image={item.node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid.src}
                      />
        
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <Button style={viewRecipeStyle} size="small" color="secondary" href={item.node.fields.slug}>
                        View Recipe <DoubleArrowIcon />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            }
            </Grid>
          </Paper>
        </Container>
      </Layout>
    );
}

export const query = graphql`
  query {
    allNodeRecipe(sort: {order: ASC, fields: created}, limit: 10) {
      totalCount
      edges {
        node {
          id
          drupal_id
          title
          fields {
            slug
          }
          langcode
          summary: field_summary {
            processed
          }
          instructions: field_recipe_instruction {
            processed
          }
          ingredients: field_ingredients
          difficulty: field_difficulty
          createdAt: created(formatString: "MM-DD-YYYY")
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
                        originalName
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
    allBlockContentBannerBlock {
      edges {
        node {
          id
          title: field_title
          summary: field_summary
          field_content_link {
            uri
            title
          }
          isPublished: status
          relationships {
            field_media_image {
              relationships {
                field_media_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 2200) {
                        src
                        srcSet
                        srcSetWebp
                        aspectRatio
                        originalName
                      }
                    }
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

function Item(props)
{
    const bannerStyle = {
      minHeight: '500px',
      alignItems: 'center',
      display: 'flex',
    };

    const summaryStyle = {
      color: '#fff',
      border: '1px solid #464646',
      background: 'rgba(0,0,0,0.42)',
      padding: '1.777em',
    }

    return (
        <CardMedia
          image={props.item.image}
          title={props.item.name}
          description={props.item.description}
          style={bannerStyle}
        >
          <Container maxWidth="md">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={summaryStyle}
            sm={6}
            item={true}
          >
              <h2>{props.item.name}</h2>
              <p>{props.item.description}</p>
              <Button href={props.item.uri} className="CheckButton" variant="contained" color="secondary">
                {props.item.uri_title} 
              </Button>
            </Grid>
          </Container>
        </CardMedia>
    )
}