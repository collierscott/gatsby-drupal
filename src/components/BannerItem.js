import React from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function BannerItem(props)
{
    const {item, bannerStyle, summaryStyle, buttonIcon} = props;

    return (
        <CardMedia
          image={item.image}
          title={item.name}
          description={item.description}
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
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <Button href={item.uri} className="CheckButton" variant="contained" color="secondary">
                {item.uri_title} {buttonIcon}
              </Button>
            </Grid>
          </Container>
        </CardMedia>
    )
}