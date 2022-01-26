import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./CreateTeam.css";
import AddItemStepper from "../../Components/Stepper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { FormHelperText, Typography } from "@mui/material";

function CreateTeam({ currentUser, setCurrentUser }) {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([currentUser]);
  const steps = ["Add Team Details", "Select Members", "Review/Add Team"];

  let history = useHistory();

  function fetchUsers() {
    fetch("/api/users")
      .then((r) => r.json())
      .then((users) => {
        let u = users.filter((user) => user.id !== currentUser.id);
        setAvailableUsers(u);
      });
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  function handleSubmit(teamName, teamDescription, selectedUsers) {
    const team = {
      name: teamName,
      description: teamDescription,
    };
    fetch("/api/teams", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(team),
    })
      .then((r) => r.json())
      .then((data) => {
        let teamId = data.id;
        selectedUsers.map((selectedUser) => {
          fetch("/api/memberships", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              user_id: selectedUser.id,
              team_id: teamId,
              "is_admin?": selectedUser.id === currentUser.id ? true : false,
            }),
          });
        });
      })
      .then(() => history.push("/teams"));
  }

  let submitParams = [teamName, teamDescription, selectedUsers];

  function firstStep() {
    return (
      <Stack
        component="form"
        sx={{
          width: "40ch",
          m: "auto",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <Typography style={{ margin: "auto" }}>Add Team Details</Typography>
        <TextField
          id="outlined-basic"
          label="Team Name"
          variant="outlined"
          onChange={(e) => setTeamName(e.target.value)}
          value={teamName}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Team Description"
          onChange={(e) => setTeamDescription(e.target.value)}
          value={teamDescription}
          multiline
          rows={4}
        />
      </Stack>
    );
  }

  function secondStep() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Typography style={{ textAlign: "center", marginBottom: "15px" }}>
          Select Members for {teamName}
        </Typography>

        <Grid
          style={{ width: "90%", margin: "0 auto" }}
          container
          columns={{ md: 2, sm: 2, lg: 12 }}
          spacing={{ md: 3, sm: 2, lg: 2 }}
        >
          <Grid textAlign="center" item xs={6}>
            <FormControl>
              <InputLabel shrink htmlFor="select-multiple-native">
                Available Users
              </InputLabel>
              <Select
                sx={{ width: "50ch", height: "13ch" }}
                multiple
                native
                label="Available Users"
                inputProps={{
                  id: "select-multiple-native",
                }}
              >
                {availableUsers
                  .sort((a, b) => a.first_name - b.first_name)
                  .map((user) => (
                    <option
                      onClick={() => {
                        const updatedUsers = availableUsers.filter(
                          (availableUser) => availableUser.id !== user.id
                        );
                        setAvailableUsers(updatedUsers);
                        setSelectedUsers([...selectedUsers, user]);
                      }}
                      key={user.id}
                      value={user.id}
                    >
                      {user.first_name} {user.last_name} (email: {user.email})
                    </option>
                  ))}
              </Select>
              <FormHelperText
                style={{ fontSize: ".9rem", color: "black", marginTop: "15px" }}
              >
                Click To Add Team Members. Be Sure to include yourself!
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid textAlign="center" item xs={6}>
            <FormControl>
              <InputLabel shrink htmlFor="select-multiple-native">
                Selected Users
              </InputLabel>
              <Select
                sx={{ width: "50ch", height: "13ch" }}
                multiple
                native
                label="Selected Users"
                inputProps={{
                  id: "select-multiple-native",
                }}
              >
                {selectedUsers.map((user) => (
                  <option
                    onClick={() => {
                      const updatedUsers = selectedUsers.filter(
                        (selectedUser) => selectedUser.id !== user.id
                      );
                      setAvailableUsers([user, ...availableUsers]);
                      setSelectedUsers(updatedUsers);
                    }}
                    key={user.id}
                    value={user.id}
                  >
                    {user.id === currentUser.id
                      ? `${user.first_name} ${user.last_name} (Me)`
                      : `${user.first_name} ${user.last_name} (email: ${user.email})`}
                  </option>
                ))}
              </Select>
              <FormHelperText
                style={{ fontSize: ".9rem", color: "black", marginTop: "15px" }}
              >
                Click To Remove Team Members. Team Members:{" "}
                {selectedUsers.length}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    );
  }
  function thirdStep() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Typography textAlign="center">Review Team Details & Submit</Typography>
        <Grid style={{ width: "50%", margin: "0 auto" }} container spacing={3}>
          <Grid textAlign="center" item xs={6}>
            <Stack
              component="form"
              sx={
                {
                  // width: "40ch",
                }
              }
              spacing={2}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Team Name"
                variant="outlined"
                value={teamName}
                disabled
              />

              <TextField
                id="outlined-multiline-flexible"
                label="Team Description"
                value={teamDescription}
                multiline
                rows={4}
                disabled
              />
            </Stack>
          </Grid>
          <Grid textAlign="center" item xs={6}>
            <FormControl disabled>
              <InputLabel shrink htmlFor="select-multiple-native">
                Selected Users
              </InputLabel>
              <Select
                sx={{ width: "30ch" }}
                multiple
                native
                label="Selected Users"
                inputProps={{
                  id: "select-multiple-native",
                }}
              >
                {selectedUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <div>
      <AddItemStepper
        handleSubmit={handleSubmit}
        submitParams={submitParams}
        steps={steps}
        stepOneContent={firstStep}
        stepTwoContent={secondStep}
        stepThreeContent={thirdStep}
      />
    </div>
  );
}

export default CreateTeam;
