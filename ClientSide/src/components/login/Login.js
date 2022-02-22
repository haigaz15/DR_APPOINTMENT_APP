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
export default function Login(props) {

  const handleClose = () => {
    props.handleClose(false)
  };

  return (
    <div className={demoCss.diaContainer}> 
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle className={demoCss.title} sx={{bgcolor:'#0e5687'}}>Log in </DialogTitle>
        <DialogContent className={demoCss.diaContent} sx={{'&.MuiDialogContent-root':{background:'#0e5687'}}}>
          <TextField
            className={demoCss.formcontrol}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            
          />
          <TextField
          autoFocus
          className={demoCss.formcontrol}
          margin="dense"
          id="passwordField"
          label="Password"
          type="password"
          fullWidth
          
          />
        <Typography sx={{margin:'auto',color:'#e8f5fe'}}>Don't have an account <Link to='signup' style={{color:'#e8f5fe'}}>click here</Link></Typography>
        </DialogContent>
        
        <DialogActions sx={{bgcolor:'#0e5687'}}>
          <Button sx={{'&.MuiButton-root':{background:'#e8f5fe'}}} onClick={handleClose}>Cancel</Button>
          <Button sx={{'&.MuiButton-root':{background:'#e8f5fe'}}} onClick={handleClose}>submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
