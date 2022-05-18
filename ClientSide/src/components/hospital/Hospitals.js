import React,{useState} from "react";
import Hospital from "./Hospital";


const Hospitals = ({hospitals}) => {

    
    return(
    <div style={{display:"flex",justifyContent:"center",flexWrap: 'wrap'}}>
        {hospitals.map((hospital) => <Hospital data={hospital} />)}
    </div>
    )
}

export default Hospitals