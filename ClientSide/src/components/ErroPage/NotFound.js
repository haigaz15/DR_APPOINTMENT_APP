

import {Box,Paper} from '@mui/material';

const style = {
    marginTop:"20%",
    marginBottom:"14.5%",
    bgcolor:'#0e5687',
    opacity:0.8,
    color:'white',
    borderRadius:5,
    padding:6,
    textAlign:"center"
}

const NotFound = () =>{
    return( <Box sx={{marginTop:"10px"}}>
            <Paper sx={style}>
                <h1>404</h1>
                    <h2>
        Aha! You see! You can be wrong!
        (or it could be us).
        …either way, you should probably
        go back to the homepage</h2> 
        </Paper>
    </Box>
     )
}

export default NotFound