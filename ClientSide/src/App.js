import React, { useState,useEffect } from 'react'
import HomePage from './components/homePage/HomePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Hospitals from './components/hospital/Hospitals';
import Header from './components/header/Header';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Doctor from './components/doctor/Doctor';
import axios from 'axios';

function App() {
  const [open, setOpen] = React.useState(false);
  const [rows ,setRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/doctor/").then((data)=>{
      setRows(data.data)}).catch(error=>console.log(error))
},[])

  const handleOpen = (state) => {
    setOpen(state)
  }
  return (
    <div>
      <Router>
        <Header handleOpen={handleOpen}/>
        <Switch>
          <Route exact path="/" >
          <HomePage/>
          </Route>
          <Route path ="/hospitals">
            <Hospitals/>
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
        </Switch>
      </Router>

    </div>
  );
}

export default App;
