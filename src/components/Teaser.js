import React from 'react'
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';
import {getImageInfo} from '../util/utilities';

export default function Teaser(props) {
    const { item, buttonTitle, buttonIcon } = props;

    const useStyles = makeStyles((theme) => ({
        card: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
      }));

      const viewTeaserStyle = {
        marginRight: 0,
        marginLeft: 'auto'
      };
  
      const classes = useStyles();

      const image = getImageInfo(item);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
            <CardHeader
                title={item.node.title}
                subheader={item.node.createdAt}
            />
            {image &&
                <CardMedia
                    className={classes.media}
                    alt={image.name}
                    image={image.src}
                    srcSet={image.srcSet}
                />
            }
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
                <Button style={viewTeaserStyle} size="small" color="secondary" href={item.node.fields.slug}>
                    {buttonTitle} {buttonIcon}
                </Button>
            </CardActions>
            </Card>
        </Grid>
    );
}