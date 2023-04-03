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

export default function DeleteDoctor() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
   
   const fetchData = async() =>
   {
    const result = await fetch("https://upchaar-backend.herokuapp.com/api/doctors")
    const jsonResult = await result.json()

    setData(jsonResult)
   }
   fetchData()
      
  }, []);
  const handleDelete = (id) => {
    fetch(`https://upchaar-backend.herokuapp.com/api/doctor/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          alert("Deleted Successfully");
          setData((current) =>
      current.filter((item) => item._id !== id)
    );
        }
      });

  };
  return (
    <TableContainer component={Paper}>
      {
        <Typography variant="h6" sx={{ my: 3 }}>
          Total available doctors: {data ? data.length : "Loading Data"}
        </Typography>
      }
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ padding: "20px 0" }}>
              Name
            </TableCell>
            <TableCell align="center">speciality</TableCell>
            <TableCell align="center">Available</TableCell>
            <TableCell align="center">fees</TableCell>
            <TableCell align="center">phoneNo</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Make Appoinment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((doctorData,i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ borderRight: "1px solid #ccc" }}
              >
                {doctorData.name}
              </TableCell>
              <TableCell
                align="center"
                style={{ borderRight: "1px solid #ccc" }}
              >
                {doctorData.speciality}
              </TableCell>
              <TableCell align="center">{doctorData.availableTime}</TableCell>
              <TableCell align="center">{doctorData.fees}</TableCell>
              <TableCell align="center">{doctorData.phoneNo}</TableCell>
              <TableCell align="center">{doctorData.gender}</TableCell>
              <TableCell align="center">
                <input
                  style={{
                    color: "#fff",
                    background: "#000",
                    padding: "10px 15px",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "red",
                  }}
                  onClick={() => {
                    handleDelete(doctorData._id);
                  }}
                  id="submit"
                  type="submit"
                  name="delete"
                  value="Delete"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
