import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import demoCss from "./Login.module.css"
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Login(props) {
  

  const [username,setUserName] = React.useState('');
  const [password,setPassword] = React.useState('');



  const handleSubmit = () => {
    axios.post("http://localhost:4000/auth/signin",{
      username:username,
      password:password
    }).then(response => {
      console.log(response)
      sessionStorage.setItem('token', response.data.accessToken);
      sessionStorage.setItem('userId',response.data.userId);
      window.location.reload()
    }).catch(error => console.log(error))
    setUserName('');
    setPassword('');
    props.handleClose(false)
  };

  const handleClose = () => {
    props.handleClose(false)
  }
  return (
    <div className={demoCss.diaContainer}> 
    <div style={{marginTop:"37%"}}></div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle className={demoCss.title} sx={{bgcolor:'#0e5687'}}>Log in </DialogTitle>
        <DialogContent className={demoCss.diaContent} sx={{'&.MuiDialogContent-root':{background:'#0e5687'}}}>
          <TextField
            className={demoCss.formcontrol}
            autoFocus
            margin="dense"
            id="name"
            label="username"
            type="username"
            fullWidth
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            
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
          onChange={(e) => setPassword(e.target.value)}
          />
        <Typography sx={{margin:'auto',color:'#e8f5fe'}}>Don't have an account <Link to='signup' style={{color:'#e8f5fe'}}>click here</Link></Typography>
        </DialogContent>
        
        <DialogActions sx={{bgcolor:'#0e5687'}}>
          <Button sx={{'&.MuiButton-root':{background:'#e8f5fe'}}} onClick={handleClose}>Cancel</Button>
          <Button sx={{'&.MuiButton-root':{background:'#e8f5fe'}}} onClick={handleSubmit}>submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
