import React, { useState,useEffect } from 'react'
import BasicTable from '../table/BasicTable';
import './Doctor.css'




const Doctor = ({rows}) => {


 
    



    return(
        <div className="container">
            <div className="item1"></div>
            <div className="item2"><BasicTable rows={rows} /></div>
        </div>
    )
}
export default Doctor;
