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
 
  React.useEffect(() => {
    
    const fetchData = async() =>
    {
     const result = await fetch("https://upchaar-backend.herokuapp.com/api/appointments")
     const jsonResult = await result.json()
 
     setpatientsData(jsonResult)
    }
    fetchData()
  }, []);
  

  const handleDelete = (id) => {
    fetch(`https://upchaar-backend.herokuapp.com/api/appointment/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          alert("Treated Successfully");
          setpatientsData((current) =>
      current.filter((item) => item._id !== id)
    );
        }
      });

  };

  return (
    <TableContainer component={Paper}>
      {
        <Typography variant="h6" sx={{ my: 3 }}>
          Total available Patients: {patientsData.length}
        </Typography>
      }
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ padding: "20px 0" }}>
              Patient Name
            </TableCell>
            <TableCell align="center">Doctor Name</TableCell>
        
            <TableCell align="center">Patient's Phone</TableCell>
            <TableCell align="center">Appointment Date</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">View More</TableCell>
            <TableCell align="center">Treatment Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientsData.map((patientsData) => (
            <TableRow
              key={patientsData._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ borderRight: "1px solid #ccc" }}
              >
                {patientsData.name}
              </TableCell>
              <TableCell align="center">{patientsData.doctersname}</TableCell>
             
              <TableCell align="center">{patientsData.phoneNo}</TableCell>
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
             
              <TableCell align="center">
                <input
                  style={{
                    color: "#FFF",
                    background: "#000",
                    padding: "10px 15px",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#648ADA",
                  }}
                  onClick={() => {
                    handleDelete(patientsData._id);
                  }}
                  id="submit"
                  type="submit"
                  name="delete"
                  value="DONE"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
