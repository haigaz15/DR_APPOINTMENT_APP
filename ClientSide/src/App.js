import React, { useState,useEffect } from 'react'
import HomePage from './components/homePage/HomePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Hospitals from './components/hospital/Hospitals';
import Header from './components/header/Header';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Doctor from './components/doctor/Doctor';
import HospitalSection from './components/hospital/HospitalSection';
import axios from 'axios';
import Footer from './components/footer/Footer';

function App() {
  const [open, setOpen] = React.useState(false);
  const [rows ,setRows] = useState([]);
  const [hospitals,setHospitals] = useState([]);
  const [hospitalRoute, setHospitalRoute] = useState("");
  const [hospitaldetails,setHospitaldetails] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/doctor/").then((value)=>{
      setRows(value.data)}).catch(error=>console.log(error))
    axios.get("http://localhost:4000/hospital/").then((value)=>{
      console.log(value.data)
      setHospitals(value.data)}).catch(error=>console.log(error))
},[])

  const handleOpen = (state) => {
    setOpen(state)
  }
  const hosptialRouteHandler = (value,data)=>{
    setHospitalRoute(value)
    setHospitaldetails(data)
  }
  console.log(hospitalRoute)
  return (
    <div>
      <Router>
        <Header handleOpen={handleOpen}/>
        <Switch>
          <Route exact path="/" >
          <HomePage/>
          </Route>
          <Route path ="/hospitals">
            <Hospitals hospitals={hospitals} hosptialRouteHandler={hosptialRouteHandler}/>
          </Route>
          <Route path="/login">
            <Login open={open} handleClose={handleOpen}/>
          </Route>
          <Route path="/signup">
            <SignUp/>
            </Route>
          <Route path="/doctors">
            <Doctor rows={rows}/>
          </Route>
          <Route path={hospitalRoute}>
            <HospitalSection hospitaldetails={hospitaldetails}/>
          </Route>
        </Switch>
        <Box sx={{position: "fixed",bottom: 0,left: 0,right: 0 }}>
        <Footer />
        </Box>
      </Router>    
    </div>
  );
}

export default App;
