import React from 'react'
import BasicTable from '../table/BasicTable';
import './Doctor.css'




const Doctor = ({rows,page,handleDoctorPageChange,lastPage}) => {
    console.log(rows)

    return(
        <div style={{marginLeft:60,marginRight:60,marginTop:"4%",marginBottom:"22%"}}><BasicTable rows={rows} page={page} handleDoctorPageChange={handleDoctorPageChange} lastPage={lastPage}/></div>
    )
}
export default Doctor;
