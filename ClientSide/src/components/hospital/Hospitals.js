import React,{useState} from "react";
import Hospital from "./Hospital";
import { Grid } from "@material-ui/core";

const Hospitals = () => {
    const [hospitals,setHospitals] = useState([1,2]);
    return(
    <Grid container spacing={3} style={{width:'100%',marginTop:'20px'}}>
        {hospitals.map(hospImg => <Hospital imgNum = {hospImg}/>)}
    </Grid>
    )
}

export default Hospitals