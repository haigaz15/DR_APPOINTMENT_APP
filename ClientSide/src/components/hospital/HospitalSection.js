import React, { useState } from 'react';
import { Paper,Box, Typography, Grid } from '@mui/material';

const HospitalSection = ({hospitaldetails}) => {
    console.log(hospitaldetails)
     return(
         <div>
         <div style={{height:"300px"}}></div>
         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
             {
            hospitaldetails.sections.map((section,index)=>
                <Grid item xs={2} sm={4} md={4} key={index} >
                    <Paper elevation={12} sx={{ width: 328, height: 30 ,"&:hover.MuiPaper-root ":{background: '#0e5687',color:"white"}}}>
                        <Typography sx={{textAlign:"center"}}>{section.name}</Typography>
                    </Paper>
                </Grid>
         )
             }
         </Grid> 
         </div>
     )
}

export default HospitalSection;