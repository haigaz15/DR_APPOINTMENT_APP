import React,{useState} from "react";
import Hospital from "./Hospital";


const Hospitals = ({hospitals,hosptialRouteHandler}) => {

    
    return(
    <div style={{display:"flex",justifyContent:"center",flexWrap: 'wrap'}}>
        {hospitals.map((hospital) => <Hospital data={hospital} hosptialRouteHandler={hosptialRouteHandler}/>)}
    </div>
    )
}

export default Hospitals