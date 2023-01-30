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
  const myData = [
    {
      id:1,
      name: "Dr Sandip Jain",
      phone: "+91 8474646463",
      email: "sandip.jain@gmail.com",
      fee:'1000',
      age: '22',
      salary: '119609',
      specialist:'Surgery',
      isActive: false,
      time:'8pm-10pm',
      picture: "http://placehold.it/32x32",
      gender: "male",
      address: "Bhopal Hospital",
    },
    {
      id:2,
      name: "Dr Rakesh Verma",
      phone: "+91 6363738383",
      email: "raky@gmail.com",
      fee:'1500',
      age: '28',
      salary: '118542',
      specialist:'Radiology',
      isActive: false,
      time:'9pm-11pm',
      picture: "http://placehold.it/32x32",
      gender: "male",
      address: "Bhopal Hospital",
    },
    {
      id:3,
      name: "Dr M Gulati",
      phone: "+91 8488939020",
      email: "m.gulati@gmail.com",
      fee:'800',
      age: '40',
      salary: '109030',
      specialist:'Anesthesiology',
      isActive: true,
      time:'8am-10am',
      picture: "http://placehold.it/32x32",
      gender: "male",
      address: "Bhopal Hospital",
    },
    {
      id:4,
      name: "Dr Amit Jain",
      phone: "+91 837379092",
      email: "amit.j@gmail.com",
      fee:'1000',
      age: '21',
      salary: '65303',
      specialist:'Anesthesiology',
      isActive: true,
      time:'8pm-10pm',
      picture: "http://placehold.it/32x32",
      gender: "male",
      address: "Bhopal Hospital",
    },
    {
      id:5,
      name: "Dr Swati Singh",
      phone: "+91 9876345634",
      email: "swati@gmail.com",
      fee:'1000',
      age: '39',
      salary: '67097',
      specialist:'Children',
      isActive: true,
      time:'8pm-10pm',
      picture: "http://placehold.it/32x32",
      gender: "male",
      address: "Bhopal Hospital",
    },
    {
      id:6,
      name: "Dr vaibhavi Patel",
      phone: "+91 7083567823",
      email: "vai@gmail.com",
      fee:'500',
      age: '20',
      salary: '54398',
      specialist:'Women',
      isActive: true,
      time:'8pm-10pm',
      picture: "http://placehold.it/32x32",
      gender: "male",
      address: "465 Gerald Court, Marne, Wyoming, 9714",
    },
  ]
 
  React.useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => setData(data));
      setData(myData)
  }, [data]);
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/doctors/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          alert("Deleted Successfully");
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
            <TableCell align="center">Specialist</TableCell>
            <TableCell align="center">Available</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Make Appoinment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((doctorData) => (
            <TableRow
              key={doctorData.name}
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
                {doctorData.specialist}
              </TableCell>
              <TableCell align="center">{doctorData.time}</TableCell>
              <TableCell align="center">{doctorData.fee}</TableCell>
              <TableCell align="center">{doctorData.phone}</TableCell>
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
