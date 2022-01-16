import { useState, useEffect } from "react";
import "./CreateProject.css";
import AddItemStepper from "../../Components/Stepper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import DataTable from "../../Components/DataTable";
import Grid from "@mui/material/Grid";

function CreateProject({ currentUser }) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [team, setTeam] = useState(null);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roleAssignments, setRoleAssignments] = useState([]);

  const steps = ["Add Project Details", "Assign Roles", "Review/Add Project"];
  const roleOptions = ["Project Lead", "Project Contributor"];

  const teams = currentUser.teams;

  useEffect(() => {
    let roleAssignments = roles.filter((role) => role.role !== "Not Assigned");
    setRoleAssignments(roleAssignments);
  }, [roles]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "First name", width: 130 },
    { field: "last_name", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 190 },

    {
      field: "role",
      headerName: "Role",
      type: "string",
      width: 130,
    },
  ];

  function firstStep() {
    return (
      <Stack
        component="form"
        sx={{
          width: "40ch",
          m: "10% auto",
          height: "40vh",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
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
        {users && (
          <Box justifyContent="center" style={{ display: "flex" }}>
            <Autocomplete
              id="combo-box-demo"
              options={users}
              getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name}`
              }
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Team Member" variant="outlined" />
              )}
              onChange={(event, newValue) => {
                setSelectedUser(newValue, null, " ");
              }}
            />
            <Autocomplete
              disablePortal
              disableClearable
              id="combo-box-demo"
              options={roleOptions}
              style={{ width: 300 }}
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
            {selectedRole && selectedUser && (
              <button
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
              </button>
            )}
          </Box>
        )}
        <DataTable
          columns={columns}
          rows={roleAssignments}
          checkboxSelection={false}
          width="52%"
        />
      </>
    );
  }

  function thirdStep() {
    return (
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid style={{ margin: "0 auto" }} container spacing={8}>
          <Grid textAlign="center" item>
            <Stack component="form" spacing={2} noValidate autoComplete="off">
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
          <Grid textAlign="center" item style={{ width: "55%" }}>
            <DataTable
              columns={columns}
              rows={roleAssignments}
              checkboxSelection={false}
              // width="52%"
            />
          </Grid>
        </Grid>
      </Box>
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
