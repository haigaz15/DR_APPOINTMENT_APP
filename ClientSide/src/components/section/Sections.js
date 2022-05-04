import React from 'react';
import Modal from '@mui/material/Modal';
import Section from './Section';
const Sections = ({open,doctors}) => {
    return(
    <div>
        <Modal           
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
        sx={{ outline: 'none'}}>
           <div style={{display:"flex",justifyContent:"center",flexWrap: 'wrap'}}>
           {doctors.map((doctor) => {return <Section doctor={doctor}/>})}
           </div>
        </Modal>
    </div>
    )
}

export default Sections