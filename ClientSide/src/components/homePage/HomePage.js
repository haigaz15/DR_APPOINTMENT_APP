

import React from "react";
import {Box,Paper} from '@mui/material';
import { borderRadius } from "@mui/system";

const style = {
    marginTop:"20%",
    marginBottom:"14.5%",
    bgcolor:'#0e5687',
    opacity:0.8,
    color:'white',
    borderRadius:5,
    padding:6,
    textAlign:"center",
    boxShadow: "20px 20px 50px 15px grey"
}

const HomePage = () => {
    
    return( <Box sx={{marginTop:"10px"}}>
        <Paper sx={style}><h1> Welcome To Doctor Appointments where all of your Inconvince vanish! Yeah I added this Now </h1> </Paper>
         </Box>
     )
}

export default HomePage;