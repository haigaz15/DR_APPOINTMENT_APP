import React from 'react';
import {Card,CardActions,Button,CardContent,CardMedia,Typography} from '@mui/material'
import Appoitment from '../appoitment/Appoitment';


const Section = ({doctor}) => {
  console.log(doctor)
    return(
        <div style={{width:"450px",marginLeft:"2%",marginTop:"2%",marginBottom:"2%"}}>
        <Card>
          <CardMedia 
          sx={{"&.MuiCardMedia-img":{width:"300px",margin:"auto"}}}
          component="img"
          height="140"
          alt="asd"
          />
              <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {doctor.firstname + " " + doctor.lastname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {doctor.specialty}
              </Typography>
              </CardContent>
          <CardActions>
              <Button size="small">Open</Button>
          </CardActions>
        </Card>
        <Appoitment doctor={doctor}/>
        </div>
      )
}

export default Section;