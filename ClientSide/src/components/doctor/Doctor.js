import axios from 'axios';
import React, {useEffect,useState} from 'react'
import BasicTable from '../table/BasicTable';
import './Doctor.css'




const Doctor = ({rows,page,handleDoctorPageChange,lastPage}) => {

    const [images,setImages] = useState([])

    const fetchImage = async (doctor) => {
        const res = await fetch(`http://localhost:4000/doctor/image/${doctor.id}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        return imageObjectURL
      };

    useEffect(()=>{
        Promise.all(rows.map((row) =>  
              fetchImage(row)
            )).then((values)=>setImages(values))

        },[rows])
    return(
        <div style={{marginLeft:60,marginRight:60,marginTop:"4%",marginBottom:"22%"}}><BasicTable rows={rows} images={images} page={page} handleDoctorPageChange={handleDoctorPageChange} lastPage={lastPage}/></div>
    )
}
export default Doctor;
