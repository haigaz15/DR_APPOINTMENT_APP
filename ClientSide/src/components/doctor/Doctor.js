import React from 'react'
import BasicTable from '../table/BasicTable';
import './Doctor.css'




const Doctor = ({rows}) => {
    console.log(rows)

    return(
        <div className="item2"><BasicTable rows={rows} /></div>
    )
}
export default Doctor;
