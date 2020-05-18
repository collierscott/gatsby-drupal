import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/CardMedia';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

export default function IndexPage (props) {

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
    }));

    const classes = useStyles();

    return (
      <Layout>
        <SEO title="Home" />
        <div className={classes.root}>
            <Container maxWidth="lg">
            <Paper>
                <Grid item xs={12} item={true}>       
                    <h1>Search</h1>
                </Grid>
            </Paper>
          </Container>
        </div>
    
      </Layout>
    );
}

// export const query = graphql`
//   query {
    
//   }
//`