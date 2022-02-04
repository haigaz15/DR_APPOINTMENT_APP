import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import demoCss from "./Login.module.css"
export default function Login(props) {

  const handleClose = () => {
    props.handleClose(false)
  };

  return (
    <div> 
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Log in </DialogTitle>
        <DialogContent className={demoCss.diaContainer}>
          <TextField
            className={demoCss.emailPassword}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            
          />
          <TextField
          autoFocus
          className={demoCss.emailPassword}
          margin="dense"
          id="passwordField"
          label="Password"
          type="password"
          fullWidth
          
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
