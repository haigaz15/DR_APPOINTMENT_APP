
import React from 'react';
import { Avatar,Grid,Box,Button,AppBar,Toolbar, Typography } from '@mui/material';
import {DropdownButton,Dropdown} from 'react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import headerCss from './Header.module.css'
import axios from 'axios';
const Header = (props) => {
    const history = useHistory()
    const handleLogin = () => {
        props.handleOpen(true)
        history.push('/login')
    }
    const handleHome = () =>{
        axios.get('http://localhost:3000/').
        then((res)=>{
            console.log(res)
        })
    }
    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar sx={{height:'80px',bgcolor:'#0e5687'}}>
                <Typography sx={{color:'#e8f5fe'}}>
                    DR-APPOINTMENT
                </Typography>
                <Button style={{ background: '#e8f5fe',marginLeft:'84%',position:'fixed'}} onClick={handleHome}> <Link to="/" style={{ textDecoration: 'none' }}>home</Link> </Button>
                <DropdownButton id="dropdown-basic-button" title="services" className={headerCss.dropDownCont}>
                    <Dropdown.Item ><Link to="/hospitals" style={{ textDecoration: 'none' }}>Hospitals</Link> </Dropdown.Item>
                    <Dropdown.Item ><Link style={{ textDecoration: 'none' }}>Private Clinics </Link></Dropdown.Item>
                    <Dropdown.Item ><Link style={{ textDecoration: 'none' }}>Dental Clinics </Link></Dropdown.Item>
                    <Dropdown.Item ><Link style={{ textDecoration: 'none' }}>Labrotories </Link></Dropdown.Item>
                    <Dropdown.Item ><Link style={{ textDecoration: 'none' }}>Doctors </Link></Dropdown.Item>
                    <Dropdown.Item ><Link style={{ textDecoration: 'none' }}>Dentists </Link></Dropdown.Item>
                </DropdownButton>
                {/* <Avatar
                sx={{ bgcolor: '#0e5687',marginLeft:'94%',position:'fixed' }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
                ></Avatar> */}
                <Button  style={{ background: '#e8f5fe',marginLeft:'94%',position:'fixed'}} onClick={handleLogin}> Log in</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
