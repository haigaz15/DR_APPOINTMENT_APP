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
      <Dialog open={props.open} onClose={handleClose} >
        <DialogTitle className={demoCss.title}>Log in </DialogTitle>
        <DialogContent className={demoCss.diaContent} >
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
        </DialogContent>
        <Typography sx={{margin:'auto'}}>Don't have an account <Link to='signup'>click here</Link></Typography>
        <DialogActions>
          <Button className={demoCss.btn} onClick={handleClose}>Cancel</Button>
          <Button className={demoCss.btn} onClick={handleClose}>submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
