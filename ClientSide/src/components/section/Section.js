import React, { useState,useEffect } from 'react';
import {Card,CardActions,Button,CardContent,CardMedia,Typography} from '@mui/material'
import {useHistory} from 'react-router-dom';



const Section = ({doctor}) => {

  const history = useHistory()

  const handleAppointment = () => {
    history.push({pathname:`/hospitals/${sessionStorage.getItem("hosRoute")}/${doctor.firstname.toLowerCase().replace(/\s+/g, '')}`,
    state: doctor
    })
  }

  const [image,setImage] = useState(null)

  const fetchImage = async () => {
      const res = await fetch(`http://localhost:4000/doctor/image/${doctor.id}`);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      console.log(imageObjectURL)
      setImage(imageObjectURL);
    };

  useEffect(()=>{
        fetchImage();
  },[])


  console.log(doctor)
    return(
        <div style={{width:"450px",marginLeft:"2%",marginTop:"2%",marginBottom:"2%"}}>
        <Card sx={{boxShadow: "20px 20px 50px 15px grey"}}>
          <CardMedia 
          sx={{"&.MuiCardMedia-img":{width:"300px",margin:"auto"}}}
          component="img"
          height="240"
          image={image}
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
              <Button size="small" onClick={handleAppointment}>Open</Button>
          </CardActions>
        </Card>
        </div>
      )
}

export default Section;