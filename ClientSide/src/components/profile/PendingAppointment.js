import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
const columns = [
    { id: 'firstName', label: 'Dr. First Name', minWidth: 170 },
    { id: 'lastName', label: 'Dr. Last Name', minWidth: 100 },
    {
      id: 'date',
      label: 'Appointment Date',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'hour',
      label: 'Time',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Apointment Status',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];



  
const PendingAppointment = ({appointment}) => {
    const appointmentStatus = (row) =>{
        if(row.appointmentstatus === "pending"){
            return <Button disableRipple={true} sx={{width: "100px",background:"#fcbe03",color:"black","&:hover": {
                backgroundColor: "#fcbe03"
            }}}>{row.appointmentstatus}</Button>
        }else if(row.appointmentstatus === "booked"){
            return <Button disableRipple={true} sx={{width: "100px",background:"green",color:"black","&:hover": {
                backgroundColor: "green"
            }}}>{row.appointmentstatus}</Button>
        }else{
            return <Button disableRipple={true} sx={{width: "100px", background:"#db3737",color:"black","&:hover": {
                backgroundColor: "#db3737"
            }}}>{row.appointmentstatus}</Button>
        }
    }
    return(
    <Paper sx={{ width: '100%',marginTop:2,marginBottom:"35%",boxShadow: "20px 20px 50px 15px grey" }} elevation={24}>
      <TableContainer sx={{ maxHeight: 730 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Appointments
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointment.map((row) => {
                return (
            <TableRow>
                <TableCell>{row.doctor.firstname}</TableCell>
                <TableCell>{row.doctor.lastname}</TableCell>
                <TableCell align="right">{new Date(row.date).getDate() +  "/" +(parseInt(new Date(row.date).getMonth()) + 1)+ "/" + new Date(row.date).getFullYear()}</TableCell>
                <TableCell align="right">{new Date(row.date).getHours() + ":" +new Date(row.date).getMinutes() }</TableCell>
                <TableCell align="right">{appointmentStatus(row)}</TableCell>
              </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
    )
}

export default PendingAppointment