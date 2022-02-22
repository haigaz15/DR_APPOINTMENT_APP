import React, { useState } from 'react';
import demoCss from './SignUp.module.css'
import { Link } from 'react-router-dom';
import {TextField,Box,FormControl,Typography} from '@mui/material/';
import axios from 'axios';
import { Button } from '@mui/material';

const SignUp = () => {

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = () => {
        axios.post("http://localhost:4000/users",{
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        }).then(response => console.log(response)).catch(error => console.log(error))
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }
    return(

    <Box className={demoCss.root}>
        <Typography variant="h4" style={{marginBottom:'20px', color:'white'}}>SignUp</Typography>
          <TextField
            className={demoCss.formcontrol}
            autoFocus
            margin="dense"
            id="name"
            label="firstName"
            type="text"
            fullWidth
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
          />
          <TextField
          autoFocus
          className={demoCss.formcontrol}
          margin="dense"
          id="name"
          label="lastName"
          type="text"
          fullWidth
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          />

        <TextField
          autoFocus
          className={demoCss.formcontrol}
          margin="dense"
          id="mail"
          label="email"
          type="text"
          fullWidth
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
        <TextField
          autoFocus
          className={demoCss.formcontrol}
          margin="dense"
          id="passwordField"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Typography sx={{margin:'auto',marginTop:'20px',color:'white'}}>alread have an accout <Link to='login' style={{color:'white'}}>click here</Link></Typography>
          <Button style={{ background: '#e8f5fe' ,marginTop:'15px'}} onClick={handleSubmit}>Sign Up</Button>
    </Box>
  )
}


export default SignUp