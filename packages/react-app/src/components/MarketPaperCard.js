import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin:'0 auto',

  },
  media: {
    height: 140,
  },
  Button:{
      margin:'0 auto'
  }
});

const MarketPaperCard = ({author,id,title,paperType,paperDescription}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardActionArea>
    
        <CardContent>
          <Typography gutterBottom variant="h8" component="h2">
              Author:
            {author}

            </Typography>
            <Typography gutterBottom variant="h9" component="h2">
            
            {title}
            
            </Typography>
            <Typography>
            Type:
            {paperType}
            </Typography>
            
         
          <Typography variant="body2" color="textSecondary" component="p">
        {paperDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" className = {classes.Button}>
          View
        </Button>
      
      </CardActions>
    </Card>
  );
}

export default MarketPaperCard