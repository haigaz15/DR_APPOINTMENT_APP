import React,{useState,useEffect} from 'react';
import { Paper,Typography,Divider,
    ListItem,ListItemText,Button,TextField,Box,Alert,AlertTitle } from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from 'axios';
import style1 from './SectionDoctorStyle'
import './SectionDoctor.css'
import Register from '../ErroPage/Register';
const SectionDoctor = ({doctor}) => {

    const [image,setImage] = useState(null)
    const [value, setValue] = React.useState(new Date('2022-08-18T21:11:54'));
    const [openReModal,setopenReModal] = useState(false);
    const [fail,setFail] = React.useState(false)
    const [success,setSuccess] = useState(false)

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

   const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleCloseRegisterModal = () => setopenReModal(false);

  const handleSubmit = (e) =>{
      if(sessionStorage.getItem("token")){
        axios.post(`http://localhost:4000/appointment`,{
            
                userId:window.sessionStorage.getItem('userId'),
                doctorId:doctor.id,
                appointmentstatus:"pending",
                date:value
            
            
        },{
            headers:{
                'Authorization' :`Bearer ${window.sessionStorage.getItem('token')}`
            } 
        }).then((value)=>{
            setSuccess(true)
        }).catch((value)=>{
            setFail(true)
        })
    }else{
        setopenReModal(true)
    }
}
  

    console.log(doctor)
    return(
        <div>
        {success ?<Alert severity="success">
            <AlertTitle>Success</AlertTitle>
                Your Appointment is successfully added— <strong>check it out in your profile!</strong>
            </Alert>:""}
            {fail ?
            <Alert severity="warning">
                <AlertTitle>warning</AlertTitle>
                    Your Appointment with chosen time slot already exsit— <strong>check it out in your profile!</strong>
            </Alert>:""}
            <Paper sx={style1} elevation={24}>
            <div className="secDocCont">
            <div className="item1">
            <span className="font-css top" ><img style={{ marginTop:20,borderRadius:40,marginLeft:20}} width={300} src={image} alt={doctor.name}/></span>
            </div>
            <div className="item2">
                <ListItem alignItems="flex-start">
                        <ListItemText
                    
                        secondary={
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="h4"
                                color="white"
                            >
                            {doctor.firstname + " " + doctor.lastname} 
                            </Typography>
                        }
                        />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="Specialty"
                    sx={{color:"white"}}
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="white"
                        >
                        {doctor.specialty} 
                        </Typography>
                    }
                    />
            </ListItem>
            <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="University"
                    sx={{color:"white"}}
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="white"
                        >
                        {doctor.university} 
                        </Typography>
                    }
                    />
            </ListItem>
            <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="Biography"
                    sx={{color:"white"}}
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="white"
                        >
                        {doctor.bio} 
                        </Typography>
                    }
                    />
            </ListItem>
            </div>
            </div>
            <Divider variant="inset" component="li" sx={{marginRight:4,color:'white'}}/>
            <Box 
                sx={{
                display:'flex',
                justifyContent:"space-evenly",
                marginTop:"10%",
                marginRight:"23.2%"
                }}>
            <Typography  sx={{color:"white"}}>Book A Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DateTimePicker
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} sx={{bgcolor:'white', label: { color: 'black' }}}/>}
                />
            </LocalizationProvider>
            </Box>
            <Box 
                sx={{
                display:'flex',
                justifyContent:"Center",
                }}>
            <Button 
                sx={{
                bgcolor:"white",
                color:'black',
                width:"26.7%",
                marginTop:"2%",
                "&:hover.MuiButton-root":{
                    bgcolor:"black",
                    color:"white",
                  }
                }} onClick={handleSubmit}>Submit</Button>  
            </Box>
            </Paper>
            <Register open={openReModal} handleCloseRegisterModal={handleCloseRegisterModal}/>
        </div>
    )
}

export default SectionDoctor