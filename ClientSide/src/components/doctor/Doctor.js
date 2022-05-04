import React from 'react'
import BasicTable from '../table/BasicTable';
import './Doctor.css'




const Doctor = ({rows,page,handleDoctorPageChange,lastPage}) => {
    console.log(rows)

    return(
        <div className="item2"><BasicTable rows={rows} page={page} handleDoctorPageChange={handleDoctorPageChange} lastPage={lastPage}/></div>
    )
}
export default Doctor;
