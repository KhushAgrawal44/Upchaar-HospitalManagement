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
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { CalendarMonth } from "@mui/icons-material";
import Calender from "../../Shared/Calender/Calender";

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

const degreeList = ["MBBS", "BCS", "FCPS", "PHD", "BMBS", "MBChC", "MBBCh"];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddDoctor = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [date, setDate] = React.useState(new Date().toDateString());

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phoneNo = formData.get("phoneNo");
    const fees = formData.get("fees");
    const age = formData.get("age");
    const speciality = formData.get("speciality");
    const address = formData.get("address");
    const salary = formData.get("salary");
    const availableTime = formData.get("availableTime");
    const gender = formData.get("gender");
    const picture = formData.get("image");
    const degrees = formData.get("degrees");
    const data = {
      name,
      phoneNo,
      email,
      fees,
      age,
      speciality,
      address,
      degrees,
      salary,
      availableTime,
      date,
      gender
    }; // picture
    fetch("https://upchaar-backend.herokuapp.com/api/doctor/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          alert("Doctor Added Successfully");
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
        <Button variant="contained">
          <NavLink
            to="/doctors"
            style={{ textDecoration: "none", width: "100%", color: "#fff" }}
          >
            Doctors List
          </NavLink>
        </Button>
      </Box>
      <hr></hr>
      <form onSubmit={handleSubmit}>
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
            <Typography variant="OVERLINE TEXT">Name</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Enter name"
              name="name"
              required
              fullWidth
            />
          </Grid>
          {/* Email */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Email</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Enter email"
              name="email"
              required
              fullWidth
            />
          </Grid>
          {/* phoneNo */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">phoneNo</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Enter number"
              name="phoneNo"
              required
              fullWidth
            />
          </Grid>
          {/* feess */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">feess</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Set feess"
              name="fees"
              required
              fullWidth
            />
          </Grid>
          {/* Age */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Age</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Set Age"
              name="age"
              required
              fullWidth
            />
          </Grid>
          {/* speciality */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">speciality</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Speciality"
              name="speciality"
              required
              fullWidth
            />
          </Grid>
          {/* Address */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Address</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Enter Address"
              variant="standard"
              name="address"
              multiline
              rows={5}
              fullWidth
            />
          </Grid>
          {/* Degrees */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Choose Degrees</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <Box>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                name="degrees"
                multiple
                value={personName}
                onChange={handleChange}
                variant="standard"
                fullWidth
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>You Can Choose Multiple Degrees </em>
                </MenuItem>
                {degreeList.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          {/* Salary */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Salary</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Enter salary"
              name="salary"
              // required
              fullWidth
            />
          </Grid>
          {/* available date */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Available availableTime</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <TextField
              id="standard-basic"
              label="Eg: 8pm-10pm"
              name="availableTime"
              required
              fullWidth
            />
          </Grid>
          {/* Joining date */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Date Of Joining</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-6.5rem" } }}>
            {/* <TextField
              id="standard-basic"
              label="Eg: 28-12-20"
              name="salary"
              required
              fullWidth
            /> */}
            <Calender value={date} setValue={setDate} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Gender</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
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
          {/* add image */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Add Image</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <Fab color="primary" aria-label="add">
              <input
                type="file"
                name="image"
                alt="image-upload"
                style={{
                  // position: "absolute",
                  // top: 0,
                  // left: 0,
                  opacity: 0,
                  cursor: "pointer",
                  zIndex: 1,
                  height: "55px",
                }}
              />
              <AddIcon
                style={{
                  position: "absolute",
                  top: 15,
                  left: 17,
                }}
              />
            </Fab>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Decision</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
              <Button variant="outlined" color="error" type="reset">
                RESET
              </Button>
              <Chip
                label="OR"
                color="secondary"
                style={{
                  marginLeft: "-.8rem",
                  marginRight: "-.8rem",
                  marginTop: ".1rem",
                }}
              />
              <Button variant="outlined" color="success" type="submit">
                SAVE
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddDoctor;
