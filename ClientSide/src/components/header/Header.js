
import React from 'react';
import { Avatar,Box,Button,AppBar,Toolbar, Typography,MenuItem,Menu} from '@mui/material';
import { Link,useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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

    const pages = [
        {route:"/",value:'home'},
        {route:"/hospitals",value:"Hospitals"},
        {route:"/doctors",value:"Doctors"},
        {route:"#",value:"Private Clinics"}
    ];


    
    const [anchorElNav, setAnchorElNav] = React.useState(null);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(false);
    };



    return(
        <Box sx={{flexGrow: 1, margin:'0.4%'}}>
            <AppBar position="static">
                <Toolbar  sx={{height:'80px',bgcolor:'#0e5687'}}>
                <Typography  variant="h6" component="div"  sx={{ mr: 2, flexGrow:1, display:{xs: 'none',md:'flex'}, color:"white" }}>
                    DR.APPOINTMENT
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    onClick={handleOpenNavMenu}
                    sx={{bgColor:"white"}}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    >
                    {pages.map((page) => (
                        <MenuItem  key={page.vlaue} onClick={handleCloseNavMenu}>
                            <Link to={page.route} style={{ textDecoration: 'none' ,color:"#0e5687" }}>{page.value}</Link>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                            <Button color="inherit"><Link to={page.route} style={{ textDecoration: 'none' ,color:"white" }}>{page.value}</Link></Button>
                    ))}
                </Box>
                <Button color="inherit" ><span style={{color:"white"}} onClick={handleLogin}> Login</span></Button>
                </Toolbar>           
            </AppBar>
        </Box>
    )
}

export default Header;
