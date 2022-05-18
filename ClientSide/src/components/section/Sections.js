import React from 'react';
import Modal from '@mui/material/Modal';
import Section from './Section';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/system';
import { IconButton, Tooltip } from '@mui/material';
const Sections = ({open,doctors,handleClose}) => {

    const closeSection = () => {
        handleClose()
    }
    
    return(
    <div>
        <Modal           
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
        sx={{overflow:"scroll"}}
        >
           
           <div style={{display:"flex",justifyContent:"center",flexWrap: 'wrap',outline:0,marginTop:"5%"}}>
           <Tooltip title="close section"><Box sx={{transform: "scale(1.8)",marginLeft:'90%' }}><IconButton onClick={closeSection} ><CancelIcon sx={{color:"#0e5687"}}/></IconButton></Box></Tooltip>
           {doctors.map((doctor) => {return <Section doctor={doctor} />})}
           </div>
        </Modal>
    </div>
    )
}

export default Sections