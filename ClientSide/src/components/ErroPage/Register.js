import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Register = ({open,handleCloseRegisterModal}) => {
    
    return(
        <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        onClose={handleCloseRegisterModal}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        
      >
        <Box
          sx={{
            position: 'relative',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >
          <Typography id="server-modal-title" variant="h6" component="h2">
          Don't have an account <Link to='signup' style={{color:"#0e5687",}}>click here!!</Link>
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }} variant="h6" component="h2">
            If your already have an account please sign in to submit your appointment.
          </Typography>
        </Box>
      </Modal>
    )
}

export default Register