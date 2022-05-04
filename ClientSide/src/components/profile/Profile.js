import React,{useState,useEffect} from 'react';
import Dashboard from '../dashboard/Dashboard';
import PendingAppointment from './PendingAppointment';
import axios from 'axios'
import './Profile.css';
import {  Switch, Route } from 'react-router-dom';
import Page from './Page'

const Profile = () => {
    const [appointment,setAppointment] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:4000/appointment/user",{
            headers:{
                'Authorization' :`Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then((result)=>{
            console.log(result)
            setAppointment(result.data)
        }).catch((result)=>{
            console.log(result)
        })
    },[])
    return(
    <div className="profileContainer">
        <div className='dashboard'>
            <Dashboard/>
        </div>
        <div className='content'>
        <Switch>
          <Route path="/profile/page" children={<Page />} />
          <Route path="/profile/pendingappointments" children={<PendingAppointment  appointment={appointment}/>} />
        </Switch>
        </div>        
    </div>
    )
}

export default Profile;