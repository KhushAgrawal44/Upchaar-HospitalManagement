import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardActions, Divider, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { NavLink } from "react-router-dom";

const ViewDoctors = () => {
  const [doctors, setDoctors] = React.useState([]);
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
      .then((data) => setDoctors(data));
      setDoctors(myData)
  }, []);
  return (
    <div>
      <h3 style={{ marginTop: "1rem", textAlign: "left" }}>
        SELECT A DOCTOR PLEASE
      </h3>
      <Grid
        container
        //   spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          margin: "2rem 0",
          padding: "3rem 1rem",
          background: "#fff",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {doctors.map((doctor) => (
          <NavLink
            to={"/addPatient/" + doctor.email}
            style={{
              textDecoration: "none",
              display: "flex",
              background: "#ccc",
              flexDirection: "row",
            }}
          >
            <Card elevation={3}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="160"
                  image="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1659640512~exp=1659641112~hmac=3587a885638b8ca8621583b406c74569e2474e99107b4a5859e96a0e65bfa567.jpg"
                  alt="green iguana"
                />
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    SPECIALITY: {doctor.specialist.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    FEE: {doctor.fee ? doctor.fee : "Free"} TK
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    GENDER: {doctor.gender.toUpperCase()}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#999",
                }}
              >
                <AccessTimeIcon sx={{ mr: 2 }} />
                <Typography> {doctor.time}</Typography>
              </CardActions>
            </Card>
          </NavLink>
        ))}
      </Grid>
    </div>
  );
};

export default ViewDoctors;
