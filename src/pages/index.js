import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { Container } from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/CardMedia';
import BannerItem from '../components/BannerItem';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Teaser from '../components/Teaser';
import cleanBlockUrl from '../util/utilities';
import {getImageInfo} from '../util/utilities';

export default function IndexPage ({ data }) {
    console.log(data);

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
    }));

    const classes = useStyles();
    const banners = data.allBlockContentBannerBlock.edges;
    const items = data.allNodeRecipe.edges;

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
      <Layout>
        <SEO title="Home" />
        <div className={classes.root}>
          <Grid item xs={12} item={true}>       
            <Carousel autoPlay={false}>
            {
              banners && banners.map(banner => {
                const b = banner.node;

                const uri = cleanBlockUrl(b.field_content_link.uri);

                const image = getImageInfo(banner);

                const item = {
                  name: b.title,
                  description: b.summary,
                  image: image.src,
                  uri: uri,
                  uri_title: b.field_content_link.title
                }
                return (
                  <BannerItem item={item} key={b.id} bannerStyle={bannerStyle} summaryStyle={summaryStyle}/>
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
              <Teaser key={item.node.id} item={item} buttonTitle='View Recipe' buttonIcon={<DoubleArrowIcon />} />
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