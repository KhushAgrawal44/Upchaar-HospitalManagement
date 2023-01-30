import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Patients() {
  const [patientsData, setpatientsData] = React.useState([]);

  const myData = [
    {
      id:1,
      patientName: "Khush Agrawal",
      doctorName:"Dr Sandip Jain",
      doctorFee:"1000",
      date:"12/1/2023",
      phone: "+91 9307479698",
      email: "ka@gmail.com",
      fee:'1000',
      age: '22',
      salary: '119609',
      specialist:'Surgery',
      isActive: false,
      time:'8pm-10pm',
      picture: "http://placehold.it/32x32",
      gender: "male",
      address: "Aurangabad",
    },
    {
      id:2,
      patientName: "Ayushi Hota",
      doctorName:"Dr Amit Jain",
      doctorFee:"1200",
      date:"19/1/2023",
      phone: "+91 6363636363",
      email: "ayu@gmail.com",
      fee:'1500',
      age: '28',
      salary: '118542',
      specialist:'Radiology',
      isActive: false,
      time:'9pm-11pm',
      picture: "http://placehold.it/32x32",
      gender: "male",
      address: "UP",
    },
   
  ]
 
  React.useEffect(() => {
    fetch("http://localhost:5000/appointments")
      .then((res) => res.json())
      .then((patientsData) => setpatientsData(patientsData));
      setpatientsData(myData)
  }, []);

  return (
    <TableContainer component={Paper}>
      {
        <Typography variant="h6" sx={{ my: 3 }}>
          Total available Doctors: {patientsData.length}
        </Typography>
      }
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ padding: "20px 0" }}>
              Patient Name
            </TableCell>
            <TableCell align="center">Doctor Name</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Patient's Phone</TableCell>
            <TableCell align="center">Appointment Date</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">View More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientsData.map((patientsData) => (
            <TableRow
              key={patientsData.patientName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ borderRight: "1px solid #ccc" }}
              >
                {patientsData.patientName}
              </TableCell>
              <TableCell align="center">{patientsData.doctorName}</TableCell>
              <TableCell align="center">{patientsData.doctorFee}</TableCell>
              <TableCell align="center">{patientsData.phone}</TableCell>
              <TableCell align="center">{patientsData.date}</TableCell>
              <TableCell align="center">{patientsData.gender.toUpperCase()}</TableCell>
              {/* <TableCell align="center">{patientsData.phone}</TableCell> */}
              <TableCell align="center">
                <form name="button">
                  <NavLink to={`/patientDetails/${patientsData._id}`}>
                    <input
                      style={{
                        color: "#fff",
                        background: "#000",
                        padding: "10px",
                        cursor: "pointer",
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#224B0C",
                      }}
                      id="submit"
                      type="submit"
                      name="appointment"
                      value="View More"
                    />
                  </NavLink>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
