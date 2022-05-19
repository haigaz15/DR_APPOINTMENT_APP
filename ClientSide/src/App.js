import React, { useState,useEffect } from 'react'
import HomePage from './components/homePage/HomePage';
import { BrowserRouter as Router, Switch, Route,useLocation } from 'react-router-dom';
import {Box} from '@mui/material'
import Hospitals from './components/hospital/Hospitals';
import Header from './components/header/Header';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Doctor from './components/doctor/Doctor';
import HospitalSection from './components/hospital/HospitalSection';
import Profile from './components/profile/Profile';
import axios from 'axios';
import Footer from './components/footer/Footer';
import ProtectedRoute from './protected.route';
import SectionDoctor from './components/section/SectionDoctor';
import NotFound from './components/ErroPage/NotFound';


function App() {
  const [open, setOpen] = React.useState(false);
  const [rows ,setRows] = useState([]);
  const [hospitals,setHospitals] = useState([]);
  const [token,setToken] = useState(null)
  const [userImage,setUserImage] = useState("");
  const [doctorPage,setDoctorPage] = useState(1);
  const [lastPage,setLastPage] = useState(1000);


   async function displayProtectedImage(
    imageUrl, authToken
      ) {
        // Fetch the image.

        const response = await fetch(imageUrl, {
          method: 'GET',
          headers: {
            'Content-type': 'image/jpeg',
              'Authorization': `Bearer ${authToken}`,
          },
          
      })
        // Create an object URL from the data.
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setUserImage(objectUrl);
 }


  useEffect(() => {
    axios.get(`http://localhost:4000/doctor/?page=${doctorPage}`).then((value)=>{
      console.log(doctorPage)
      setRows(value.data.data)
      setLastPage(value.data.last_page)
      console.log(value.data)
    }).catch(error=>console.log(error))
    axios.get("http://localhost:4000/hospital/").then((value)=>{
      console.log(value.data)
      setHospitals(value.data)}).catch(error=>console.log(error))

      if(sessionStorage.getItem('token')){
        displayProtectedImage(`http://localhost:4000/users/image/`,sessionStorage.getItem('token'))
      }

},[doctorPage])
  

  const handleOpen = (state) => {
    setOpen(state)
  }


  const handleDoctorPageChange = (page) => {
    setDoctorPage(page)
  }


  const location = useLocation()

  return (
    <div style={{display:"flex", flexDirection: "column" }}>
      
        <Header handleOpen={handleOpen} token={token} setToken={setToken} image={userImage} />
        <Switch>
          <Route exact path="/" >
          <HomePage/>
          </Route>
          <Route exact path ="/hospitals">
            <Hospitals hospitals={hospitals} />
          </Route>
          <Route exact path="/hospitals/:name">
            <HospitalSection/>
          </Route>
          <Route path="/hospitals/:name/:doctorname">
            <SectionDoctor doctor={location.state}/>
          </Route>
          <Route path="/login">
            <Login open={open} handleClose={handleOpen} setToken={setToken} />
          </Route>
          <Route path="/signup">
            <SignUp/>
            </Route>
          <Route path="/doctors">
            <Doctor rows={rows} page={doctorPage} handleDoctorPageChange={handleDoctorPageChange} lastPage={lastPage}/>
          </Route>
          <ProtectedRoute path="/profile" component={Profile}/>
          <Route path="*" component={NotFound} />
        </Switch>

      <Box style={{marginBottom:"auto"}}>
      <Footer />
      </Box>
    </div>
  );
}

export default App;
