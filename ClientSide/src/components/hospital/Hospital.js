

import React, { useState } from 'react';
import {Card,CardActions,Button,CardContent,CardMedia,Typography,Grid} from '@material-ui/core';
const Hospital = (props) => {
     return(
      <Grid item xs ={2}>
        <Card style={{width:"100%",background:"#e8f5fe"}}>
        <CardMedia
          component="img"
          height="140"
          image ={`/assets/images/hospitals/${props.imgNum}.png`}
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
        </Grid>
     )
}

export default Hospital;