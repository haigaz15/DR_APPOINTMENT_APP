import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar,Button } from '@mui/material';
import { List,ListItem,ListItemText,Divider,TextField,Alert,AlertTitle } from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from 'axios';
import Register from '../ErroPage/Register';
import { parseISO } from 'date-fns'; 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const avatarStyle = {
    top:'5%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }



const Appoitment = ({open,handleClose,doctor,setOpenAppointment,image}) => {
    const userId = sessionStorage.getItem('userId')

    const [value, setValue] = React.useState(new Date(Date.parse('2022-01-26T13:51:50.417-07:00')));
    const [user,setUser] = React.useState(null);

    const [openReModal,setopenReModal] = React.useState(false);
    const [success,setSuccess] = React.useState(false);
    const [fail,setFail] = React.useState(false)

    const handleChange = (newValue) => {
        // let a = new Date(newValue).getDay()
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
                handleClose()
                setSuccess(true)
            }).catch((value)=>{
                handleClose()
                setFail(true)
            })
        }else{
            handleClose()
            setopenReModal(true)
        }
    }
    return (
      <div>
            {success ?
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                    Your Appointment is successfully added— <strong>check it out in your profile!</strong>
            </Alert>:""}
            {fail ?
            <Alert severity="warning">
                <AlertTitle>warning</AlertTitle>
                    Your Appointment with chosen time slot already exsit— <strong>check it out in your profile!</strong>
            </Alert>:""}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
           <Avatar alt={doctor.firstname} src={image} sx={avatarStyle}/>
           <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary={doctor.firstname + doctor.lastname}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="Specialty"
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                        {doctor.specialty} 
                        </Typography>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="Brief Biography"
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                        {doctor.bio} 
                        </Typography>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="Country of Specialty"
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                        {doctor.countryOfSpecialty} 
                        </Typography>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="University"
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                        {doctor.university} 
                        </Typography>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="Email"
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                        {doctor.email} 
                        </Typography>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="Hospital"
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                        {} 
                        </Typography>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="Book A Date"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Date&Time picker"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </ListItem>
                <ListItem>
                    <Button sx={{margin:'auto',color:'#0e5687'}} onClick={handleSubmit}>Submit</Button>
                </ListItem>
            </List>
          </Box>
        </Modal>
        <Register open={openReModal} handleCloseRegisterModal={handleCloseRegisterModal}/>
      </div>
    );
  
}

export default Appoitment;







