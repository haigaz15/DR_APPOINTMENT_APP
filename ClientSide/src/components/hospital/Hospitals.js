import React,{useState} from "react";
import Hospital from "./Hospital";


const Hospitals = () => {
    const [hospitals,setHospitals] = useState([1,2]);
    return(
    <div style={{display:"flex",justifyContent:"center",flexWrap: 'wrap'}}>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
        <Hospital/>
    </div>
    )
}

export default Hospitals