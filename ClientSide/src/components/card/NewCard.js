
import React from 'react';
import {Card,CardActions,Button,CardContent,CardMedia,Typography} from '@mui/material'

  const NewCard = ({data,handleOpenHospital,hosptialRouteHandler,image}) => {
    const handleClicked = () => {
      sessionStorage.setItem('hosdata',JSON.stringify(data))
      sessionStorage.setItem('hosRoute',data.name.toLowerCase().replace(/\s+/g, ''))
      handleOpenHospital(`/hospitals/${data.name.toLowerCase().replace(/\s+/g, '')}`)
    }
    return(
      <Card>
        <CardMedia 
        sx={{"&.MuiCardMedia-img":{width:"300px",margin:"auto"}}}
        component="img"
        height="140"
        image={image}
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