import React, { useState, useEffect } from 'react';
import { Paper,Box, Typography, Grid } from '@mui/material';
import axios from 'axios';
import Sections from '../section/Sections';


const HospitalSection = () => {

    const [hospitaldetails,setHosDetails] = useState(JSON.parse(sessionStorage.getItem('hosdata')))
    const [openSection, setOpenSection] = useState(false);
    const [doctors,setDoctors] = useState([]);

    const handleClose = () =>{
        setOpenSection(false)
    }
    

    const openTheSection = (section) => {
         setOpenSection(true)
        axios.get(`http://localhost:4000/doctor/${hospitaldetails.id}/${section.id}`).then((value)=>{
            let result = value.data;
            console.log(result)
            setDoctors(result)
        })
    }

     return(
         <div >
         <Paper><h1>{hospitaldetails.name} </h1> </Paper>
         <Paper sx={{marginTop:"2%"}}><h2> {hospitaldetails.location}</h2></Paper>
         <div style={{height:"300px"}}></div>
         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{marginBottom:"2%"}} >
             {
            hospitaldetails.sections.map((section,index)=>
                <Grid item xs={2} sm={4} md={4} key={index} >
                    <Paper elevation={12} sx={{ width: 328, height: 30 ,"&:hover.MuiPaper-root ":{background: '#0e5687',color:"white"}}} onClick={(e) => {openTheSection(section)}}>
                        <Typography sx={{textAlign:"center"}}>{section.name}</Typography>
                    </Paper>
                </Grid>
         )
             }
         </Grid>
         <Sections open={openSection} doctors={doctors} handleClose={handleClose}/>
         </div>
     )
}

export default HospitalSection;