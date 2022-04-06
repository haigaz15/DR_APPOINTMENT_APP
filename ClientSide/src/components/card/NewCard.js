
import React from 'react';
import {Card,CardActions,Button,CardContent,CardMedia,Typography} from '@mui/material'

  const NewCard = ({data,handleOpenHospital,hosptialRouteHandler}) => {

    const handleClicked = () =>{
      hosptialRouteHandler(`/${data.name.toLowerCase().replace(/\s+/g, '')}`,data)
      handleOpenHospital(`/${data.name.toLowerCase().replace(/\s+/g, '')}`)
    }
    return(
      <Card>
        <CardMedia
        component="img"
        height="140"
        alt={data.name}
        />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.location}
            </Typography>
            </CardContent>
        <CardActions>
            <Button size="small" onClick= {handleClicked}>Open</Button>
        </CardActions>
      </Card>
    )
  }

export default NewCard;