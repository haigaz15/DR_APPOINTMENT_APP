
import React, { useState } from 'react';
import {Card,CardActions,Button,CardContent,CardMedia,Typography,Grid} from '@material-ui/core';
import styles from './NewCard.Module.css';
  const NewCard = () => {
    return(
      <Card >
        <CardMedia
        component="img"
        height="140"
        alt="Astgh.Med.Cent"
        />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Astghik Medical center 
            </Typography>
            <Typography variant="body2" color="text.secondary">
            </Typography>
            </CardContent>
        <CardActions>
            <Button size="small">Open</Button>
        </CardActions>
      </Card>
    )
  }

export default NewCard;