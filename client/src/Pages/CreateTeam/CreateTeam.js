import React, { useState, useEffect } from "react";
import "./CreateTeam.css";
import AddItemStepper from "../../Components/Stepper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

function CreateTeam({ currentUser }) {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const steps = ["Add Team Details", "Select Members", "Review/Add Team"];

  function fetchUsers() {
    fetch("/api/users")
      .then((r) => r.json())
      .then((users) => setAvailableUsers(users));
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

      .then(
        fetchUsers(),
        setTeamDescription(""),
        setTeamName(""),
        setSelectedUsers([])
      );
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
        <Grid style={{ width: "50%", margin: "0 auto" }} container spacing={8}>
          <Grid textAlign="center" item xs={6}>
            <FormControl>
              <InputLabel shrink htmlFor="select-multiple-native">
                Available Users
              </InputLabel>
              <Select
                sx={{ width: "25ch" }}
                multiple
                native
                label="Available Users"
                inputProps={{
                  id: "select-multiple-native",
                }}
              >
                {availableUsers.map((user) => (
                  <option
                    onClick={() => {
                      const updatedUsers = availableUsers.filter(
                        (availableUser) => availableUser.id !== user.id
                      );
                      setAvailableUsers(updatedUsers);
                      setSelectedUsers([user, ...selectedUsers]);
                    }}
                    key={user.id}
                    value={user.id}
                  >
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid textAlign="center" item xs={6}>
            <FormControl>
              <InputLabel shrink htmlFor="select-multiple-native">
                Selected Users
              </InputLabel>
              <Select
                sx={{ width: "25ch" }}
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
                    {user.first_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    );
  }
  function thirdStep() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid style={{ width: "50%", margin: "0 auto" }} container spacing={8}>
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
                onChange={(e) => setTeamName(e.target.value)}
                value={teamName}
                disabled
              />

              <TextField
                id="outlined-multiline-flexible"
                label="Team Description"
                onChange={(e) => setTeamDescription(e.target.value)}
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
                sx={{ width: "25ch" }}
                multiple
                native
                label="Selected Users"
                inputProps={{
                  id: "select-multiple-native",
                }}
              >
                {selectedUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name}
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
