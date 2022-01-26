import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LandingImg from "../Components/LandingImg";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="#2F7B32" href="https://www.linkedin.com/in/dan-hyman-dev/">
        Dan Hyman
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignUp({ setCurrentUser, currentUser }) {
  let history = useHistory();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        setCurrentUser({
          first_name,
          last_name,
          email,
          password,
        });
        history.push("/dashboard");
      } else {
        res.json().then((e) => setErrors(e.errors));
      }
    });
  }

  return (
    <>
      {errors[0] && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {" "}
          <Stack sx={{ width: "20vw" }} spacing={2}>
            {errors.map((err) => {
              return <Alert severity="error">{err}</Alert>;
            })}
          </Stack>
        </div>
      )}
      <Grid
        style={{ marginTop: "10%", width: "80%", margin: "5% auto 0%" }}
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <LandingImg width={"85%"} height={"500px"} />
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              marginTop: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(e) => setFirstName(e.target.value)}
                    value={first_name}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(e) => setLastName(e.target.value)}
                    value={last_name}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/log-in" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <CssBaseline />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
