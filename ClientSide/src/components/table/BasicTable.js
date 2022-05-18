import  React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Grid,Box,TextField, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Appoitment from '../appoitment/Appoitment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



export default function BasicTable({rows,page,handleDoctorPageChange, lastPage}) {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [filtered,setFiltered] = React.useState([]);
  const [flag,setFlag] = React.useState(true)
  const [clickedDoctor,setClickedDoctor] = useState({});
  const searchResult = (e)=>{
    const filterRows = rows.filter((row)=>{
      return (
       row.firstname.toLowerCase().includes(e.target.value.toLowerCase()) ||
       row.section.name.toLowerCase().includes(e.target.value.toLowerCase())||
       row.lastname.toLowerCase().includes(e.target.value.toLowerCase())||
       row.specialty.toLowerCase().includes(e.target.value.toLowerCase())||
       row.countryOfSpecialty.toLowerCase().includes(e.target.value.toLowerCase())||
       row.hospitals[0].name.toLowerCase().includes(e.target.value.toLowerCase())
       ) 
    })
    setFlag(false);
    setFiltered(filterRows)
  }

  const handleDoctorClicked = (e,id) =>{
    setOpen(true)
    let filtered = rows.filter((row)=>{return row.id === id});
    setClickedDoctor(filtered[0]);
  }
  const handleForwardArrow = ()=> {
    setFlag(true)
    let newPage = page + 1
    if(newPage > lastPage){
      newPage = lastPage
      handleDoctorPageChange(newPage)
    }else{
      handleDoctorPageChange(newPage)
    }
  }
  const handleBackwaredArrow = ()=> {
    setFlag(true)
    let newPage = page - 1
    if(newPage < 1){
      newPage = 1
      handleDoctorPageChange(newPage)
    }else{
      handleDoctorPageChange(newPage)
    }
  }
  return (
    <Paper elevation={20}>
      <Grid container direction="column" alignItems="center" justify="center">
          <TextField
            label={`Search`}
            onChange={searchResult}
            sx={{width:"50%"}}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
      </Grid>
      <TableContainer  >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name </TableCell>
              <TableCell align="right">Specialty</TableCell>
              <TableCell align="right">section</TableCell>
              <TableCell align="right">Hospital</TableCell>
              <TableCell align="right">countryOfSpecialty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flag ? rows.map((row) =>(
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } , '&:hover.MuiTableRow-root':{background: '#0e5687',opacity:0.9}}}
                onClick={(e)=>handleDoctorClicked(e,row.id)}
              >
                <TableCell component="th" scope="row" >
                  <Grid container>
                    <Grid item lg={2}><Avatar alt={row.firstname} src='.' sx={{marginTop:"-20%",marginLeft:"-20%"}}/></Grid>
                    <Grid item lg={10}>{row.firstname} {row.lastname}</Grid>
                  </Grid>
                </TableCell>
                <TableCell align="right" >{row.specialty}</TableCell>
                <TableCell align="right">{row.section.name}</TableCell>
                <TableCell align="right">{row.hospitals[0].name}</TableCell>
                <TableCell align="right">{row.countryOfSpecialty}</TableCell>
              </TableRow>
             
            )): filtered.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } , '&:hover.MuiTableRow-root':{background: '#0e5687',opacity:0.9}}}
                onClick={(e)=>handleDoctorClicked(e,row.id)}
              >
                <TableCell component="th" scope="row">
                  <Grid container>
                    <Grid item lg={2} ><Avatar alt={row.firstname} src='.' sx={{marginTop:"-20%",marginLeft:"-20%"}}/></Grid>
                    <Grid item lg={10}>{row.firstname} {row.lastname}</Grid>
                  </Grid>
                </TableCell>
                <TableCell align="right">{row.specialty}</TableCell>
                <TableCell align="right">{row.section.name}</TableCell>
                <TableCell align="right">{row.hospitals[0].name}</TableCell>
                <TableCell align="right">{row.countryOfSpecialty}</TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
        <Box sx={{display:"flex",justifyContent:"center"}}>
        <Tooltip title="previous page">
        <IconButton onClick={handleBackwaredArrow}><ArrowBackIosIcon/></IconButton>
        </Tooltip>
        <Tooltip title="next page">
        <IconButton onClick={handleForwardArrow}><ArrowForwardIosIcon/></IconButton>
        </Tooltip>
        </Box>
      </TableContainer>
      <Appoitment open={open} handleClose={handleClose} doctor={clickedDoctor} />
    </Paper>
  );
}
