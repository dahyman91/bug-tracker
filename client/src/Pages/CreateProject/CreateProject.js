import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./CreateProject.css";
import AddItemStepper from "../../Components/Stepper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import DataTable from "../../Components/DataTable";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { FormControl, FormHelperText, Typography } from "@mui/material";

function CreateProject({ currentUser, setCurrentUser }) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [team, setTeam] = useState(null);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roleAssignments, setRoleAssignments] = useState([]);
  let history = useHistory();

  const steps = ["Add Project Details", "Assign Roles", "Review/Add Project"];
  const roleOptions = ["Project Lead", "Developer", "Designer", "QA"];

  const teams = currentUser.teams;

  useEffect(() => {
    let roleAssignments = roles.filter((role) => role.role !== "Not Assigned");
    setRoleAssignments(roleAssignments);
  }, [roles]);

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }, [setCurrentUser]);

  const columns = [
    {
      field: "role",
      headerName: "Role",
      type: "string",
      width: 190,
    },
    { field: "first_name", headerName: "First name", width: 190 },
    { field: "last_name", headerName: "Last name", width: 190 },
    { field: "email", headerName: "Email", width: 190 },
    { field: "id", headerName: "ID", width: 190 },
  ];

  function firstStep() {
    return (
      <Stack
        component="form"
        sx={{
          width: "40ch",
          m: "auto",
          height: "40vh",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <Typography style={{ margin: "auto" }}>Add Project Details</Typography>
        <TextField
          id="outlined-basic"
          label="Project Name"
          variant="outlined"
          onChange={(e) => setProjectName(e.target.value)}
          value={projectName}
        />
        <Autocomplete
          disableClearable
          disablePortal
          id="combo-box-demo"
          options={teams}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Select Team" variant="outlined" />
          )}
          onChange={(event, newValue) => {
            let team = JSON.stringify(newValue, null, " ");
            setTeam(JSON.parse(team));
            setUsers(JSON.parse(team).users);
            const defaultRoles = [];
            JSON.parse(team).users.map((user) => {
              let object = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                id: user.id,
                role: "Not Assigned",
              };
              defaultRoles.push(object);
            });
            setRoles(defaultRoles);
          }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Project Description"
          onChange={(e) => setProjectDescription(e.target.value)}
          value={projectDescription}
          multiline
          rows={4}
        />
      </Stack>
    );
  }

  function secondStep() {
    return (
      <>
        <Typography
          style={{ textAlign: "center", padding: "1%", marginBottom: "10px" }}
        >
          Assign Team Members Roles
        </Typography>
        {users && (
          <Box justifyContent="center" style={{ display: "flex" }}>
            <FormControl>
              <Autocomplete
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option) =>
                  `${option.first_name} ${option.last_name}`
                }
                style={{ width: "35vw" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Team Member"
                    variant="outlined"
                  />
                )}
                onChange={(event, newValue) => {
                  setSelectedUser(newValue, null, " ");
                }}
              />
              <FormHelperText>
                Be sure to assign yourself a role!
              </FormHelperText>
            </FormControl>

            <Autocomplete
              disablePortal
              disableClearable
              id="combo-box-demo"
              options={roleOptions}
              style={{ width: "35vw" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Project Role"
                  variant="outlined"
                />
              )}
              onChange={(event, newValue) => {
                setSelectedRole(newValue);
              }}
            />
          </Box>
        )}
        {selectedRole && selectedUser && (
          <div style={{ width: "100%", display: "flex", padding: "10px" }}>
            <Button
              variant="contained"
              style={{
                margin: "auto",
                padding: "10px",
                // width: "20%",
              }}
              onClick={() => {
                const updatedRoles = roles.map((obj) => {
                  if (obj.id === selectedUser.id) {
                    return { ...obj, role: selectedRole };
                  }
                  return obj;
                });
                setRoles(updatedRoles);
              }}
            >
              Submit Role
            </Button>
          </div>
        )}

        {roles.filter((role) => role.role !== "Not Assigned")[0] && (
          <DataTable
            columns={columns}
            rows={roleAssignments}
            checkboxSelection={false}
            // width="90%"
          />
        )}
      </>
    );
  }

  function thirdStep() {
    return (
      <>
        {roles[0] ? (
          <>
            {roles.filter((role) => role.email === currentUser.email)[0]
              .role === "Not Assigned" ? (
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Typography style={{ textAlign: "center" }}>
                  You have not assigned yourself a role. Please go back and
                  assign yourself a role for this project.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 1, width: "90vw", margin: "auto" }}>
                <Typography style={{ textAlign: "center" }}>
                  Review & Submit Project
                </Typography>
                <Grid
                  style={{ width: "100%", margin: "auto" }}
                  container
                  spacing={1}
                >
                  <Grid xs={10} md={6} style={{}} item>
                    <Stack
                      style={{ width: "80%", margin: "auto" }}
                      component="form"
                      spacing={1}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-basic"
                        label="Project Name"
                        variant="outlined"
                        value={projectName}
                        disabled
                      />
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Team Name"
                        value={team.name}
                        multiline
                        rows={1}
                        disabled
                      />

                      <TextField
                        id="outlined-multiline-flexible"
                        label="Project Description"
                        value={projectDescription}
                        multiline
                        rows={4}
                        disabled
                      />
                    </Stack>
                  </Grid>
                  <Grid xs={10} md={6} textAlign="center" item>
                    <DataTable
                      style={{ width: "80%", margin: "auto" }}
                      columns={columns}
                      rows={roleAssignments}
                      checkboxSelection={false}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </>
        ) : (
          <Typography style={{ textAlign: "center" }}>
            You have not asssigned any roles! Please return to the previous
            page.
          </Typography>
        )}
      </>
    );
  }
  function handleSubmit(roles, team, projectName, projectDescription) {
    const project = {
      name: projectName,
      description: projectDescription,
      team_id: team.id,
    };
    console.log(project);
    fetch("/api/projects", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((r) => r.json())
      .then((data) => {
        let projectId = data.id;
        let roleAssignments = roles.filter(
          (role) => role.role !== "Not Assigned"
        );
        roleAssignments.map((roleAssignment) => {
          fetch("/api/roles", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              user_id: roleAssignment.id,
              project_id: projectId,
              name: roleAssignment.role,
            }),
          });
        });
      });
    history.push("/projects");
  }

  const submitParams = [roles, team, projectName, projectDescription];
  return (
    <div>
      <AddItemStepper
        steps={steps}
        stepOneContent={firstStep}
        stepTwoContent={secondStep}
        stepThreeContent={thirdStep}
        handleSubmit={handleSubmit}
        submitParams={submitParams}
      />
    </div>
  );
}

export default CreateProject;
