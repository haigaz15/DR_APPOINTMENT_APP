import React from 'react'
import HomePage from './components/homePage/HomePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Hospitals from './components/hospital/Hospitals';
import Header from './components/header/Header';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Doctor from './components/doctor/Doctor';
function App() {
  const [open, setOpen] = React.useState(false);

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
          <Route path="/signup"><SignUp/></Route>
          <Route path="/doctors"><Doctor/> </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
