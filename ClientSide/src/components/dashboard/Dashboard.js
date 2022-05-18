import * as React from 'react';
import Box from '@mui/material/Box';
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import Dns from '@mui/icons-material/Dns';
import { useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const data = [
    { icon: <People />, label: 'Profile Page',route:'/profile/page' },
    { icon: <Dns />, label: 'Pending Appointments',route:'/profile/pendingappointments' },

  ];
  


const Dashboard = () =>{

const [open, setOpen] = React.useState(true);
const history = useHistory();

const handlelogout = () => {
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("userId")
  window.location.reload()
}

  return (
    <Box sx={{ display: 'flex'}}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: '#0e5687'},
          },
        })}
      >
        <Paper elevation={5} sx={{ width: 270,height:600, borderRadius:2, marginTop:2,marginBottom:2 }}>
            <Divider />
            <ListItem component="div" >
              <ListItemButton sx={{ height: 56 }}>
                <ListItemText
                  primary={`Welcome gargar`}
                  primaryTypographyProps={{
                    color: 'white',
                    fontWeight: 'medium',
                    variant: 'body1',
                  }}
                />
              </ListItemButton>
              <Tooltip title="Logout">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      color: 'rgba(255,255,255,0.8)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    },

                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      height: '80%',
                      display: 'block',
                      left: 0,
                      width: '1px',
                      bgcolor: 'divider',
                    },
                  }}
                  onClick={handlelogout}
                >
                  <LogoutIcon />
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: open ? '#0e5687' : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary="Build"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                    color:'white'
                  }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    onClick={(e)=>{history.push(item.route)}}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                ))}
            </Box>
        </Paper>
      </ThemeProvider>
    </Box>
    )
}

export default Dashboard;