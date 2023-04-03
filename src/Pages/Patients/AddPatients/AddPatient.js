import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Calender from "../../Shared/Calender/Calender";
import { Email } from "@mui/icons-material";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["MBBS", "BCS", "FCPS", "PHD", "BMBS", "MBChC", "MBBCh"];
const packages = ["24 HOURS", "MORE THAN 2 DAYS", "10 DAYS OR MORE"];

function getStyles(name, packageName, theme) {
  return {
    fontWeight:
      packageName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddPatient = () => {
  const theme = useTheme();
  const [packageName, setpackageName] = React.useState([]);
  const [date, setDate] = React.useState(new Date().toDateString()); // take only date not time

  const [file, setFile] = useState(null);
 
  const [error, setError] = useState(null);

  const types = ["application/pdf", "text/plain"];

  const changeHandler = (event) => {
    let selected = event.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
    }
  };

  
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setpackageName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };
  // reset form if confirmed
  const form = useRef(null);
  const handleReset = () => {
    let text = "Are you sure you want to reset?";
    if (window.confirm(text) == true) {
      form.current.reset();
    } else {
      console.log("cancelled");
    }
  };
  // get doctors email from url
  const url = window.location.href;
  const doctorEmail = url.substring(url.lastIndexOf("/") + 1);
  const [doctorInfo, setDoctorInfo] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/doctors/${doctorEmail}`)
      .then((res) => res.json())
      .then((data) => setDoctorInfo(data[0]));
  }, []);
  // form data submit
  // formData.append("file", file);
  // fetch("/upload", {
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phoneNo = formData.get("phoneNo");
    const age = formData.get("age");
    const weight = formData.get("weight");
    const SelectedPackage = packageName;
    const address = formData.get("address");
    const medicalHistory = formData.get("medicalHistory");
    const gender = formData.get("radio-buttons-group");
    const bloodGroup = formData.get("bloodGroup");
    const doctorName = doctorInfo.name;
    const doctorEmail = doctorInfo.email;
    const doctorphoneNo = doctorInfo.phoneNo;
    const doctorFee = doctorInfo.fee;
    const data = {
      name,
      phoneNo,
      doctorName,
      doctorEmail,
      doctorphoneNo,
      doctorFee,
      age,
      weight,
      address,
      medicalHistory,
      gender,
      bloodGroup,
      date,
    };
    console.log(data)
   
    fetch("https://upchaar-backend.herokuapp.com/api/appointment/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          alert("Appointment Created Successfully");
        }
      });
  };

  return (
    <Box
      style={{
        border: "2px solid #ccc",
        padding: "1rem 1rem",
        background: "#fff",
      }}
    >
      <Box style={{ display: "flex" }}>
        <Button variant="contained" sx={{ fontWeight: 700 }}>
          <NavLink
            to="/doctors"
            style={{ textDecoration: "none", width: "100%", color: "#fff" }}
          >
            Doctors List
          </NavLink>
        </Button>
       
        <Button
          variant="contained"
          sx={{ ml: 2, fontWeight: 700 }}
          color="success"
        >
          <NavLink
            to={`/appointment/${doctorEmail}`}
            style={{ textDecoration: "none", width: "100%", color: "#fff" }}
          >
            Selected Doctor Info
          </NavLink>
        </Button>
      </Box>
      <hr></hr>
      <form ref={form} onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: ".5rem 2rem",
            textAlign: "start",
          }}
        >
          {/* Add Name */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">PATIENT NAME</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Enter name of patient"
              required
              fullWidth
              name="name"
            />
          </Grid>
          {/* phoneNo */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">phoneNo</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Enter phoneNo number"
              required
              fullWidth
              name="phoneNo"
            />
          </Grid>
          {/* Age */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">AGE</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Enter Age"
              required
              fullWidth
              name="age"
            />
          </Grid>
          {/* weight */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">WEIGHT</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Enter Weight"
              // required
              fullWidth
              name="weight"
            />
          </Grid>
          
          {/* Appointment date */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">SELECT DATE</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              marginLeft: { md: "-6.5rem" },
              display: "flex",
              width: "100%",
            }}
          >
            <Calender value={date} setValue={setDate} />
            
          </Grid>
          {/* Address */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">ADDRESS</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Enter your address"
              multiline
              rows={3}
              fullWidth
              name="address"
            />
          </Grid>
          {/* Medical History */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">MEDICAL HISTORY</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Describe Medical History & Symptopms"
              multiline
              rows={3}
              fullWidth
              name="medicalHistory"
            />
          </Grid>
         
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">GENDER</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group-label"
              name="radio-buttons-group"
              required
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Grid>
          {/* Blood group */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">BLOOD</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <RadioGroup
              row
              aria-labelledby="blood-label"
              name="blood"
              required
            >
              <FormControlLabel value="O+" control={<Radio />} label="O+" />
              <FormControlLabel value="O-" control={<Radio />} label="O-" />
              <FormControlLabel value="A+" control={<Radio />} label="A+" />
              <FormControlLabel value="A-" control={<Radio />} label="A-" />
              <FormControlLabel value="B+" control={<Radio />} label="B+" />
              <FormControlLabel value="B-" control={<Radio />} label="B-" />
              <FormControlLabel value="AB+" control={<Radio />} label="AB+" />
              <FormControlLabel value="AB-" control={<Radio />} label="AB-" />
            </RadioGroup>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">DECISION</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
              <Button variant="contained" color="error" onClick={handleReset}>
                RESET
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ ml: 2 }}
                type="submit"
              >
                SUBMIT
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddPatient;
