import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingImg from "../Components/LandingImg";
import { FormControl, FormHelperText } from "@mui/material";
import { Stack, Alert } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/dan-hyman-dev/">
        Dan Hyman
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

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
  console.log(errors);

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
          <FormControl>
            <Box
              sx={{
                marginTop: 10,
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
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

                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
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
        </Grid>
      </Grid>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </ThemeProvider>
    </>
  );
}
