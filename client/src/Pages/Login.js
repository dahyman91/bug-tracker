import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LandingImg from "../Components/LandingImg";
import { FormControl } from "@mui/material";
import { Stack, Alert } from "@mui/material";
import { CssBaseline } from "@material-ui/core";

import "./Login.css";

function Copyright() {
  return (
    <Typography
      style={{
        position: "absolute",
        bottom: "0px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
      variant="body2"
      align="center"
    >
      {"Copyright © "}
      <Link color="#2F7B32" href="https://dan-hyman.com">
        Dan Hyman
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function LogIn({ setCurrentUser, currentUser }) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          history.push("/dashboard");
        });
      } else {
        r.json().then((e) => setErrors(e.errors));
      }
    });
  };

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
      <div className="login-container" container spacing={2}>
        <LandingImg className="landing-img" width="100%" />

        <FormControl className="sign-in-form-container">
          <Box
            className="sign-in-form"
            sx={{
              width: "80%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              style={{ marginTop: "2vh" }}
              component="h1"
              variant="h5"
            >
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid style={{ margin: "auto" }} item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </FormControl>
      </div>
      {/* <CssBaseline /> */}
      <Copyright />
    </>
  );
}
