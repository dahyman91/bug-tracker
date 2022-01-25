import "./Project.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DataTable from "../../Components/DataTable";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  Autocomplete,
  FormHelperText,
  LinearProgress,
} from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@material-ui/core";

function Project({ currentUser }) {
  const [project, setProject] = useState("");
  const [detailRoles, setDetailRoles] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [ticketRows, setTicketRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    let r = [];
    project &&
      project.roles.map((role) => {
        fetch(`/api/show_user/${role.user_id}`)
          .then((r) => r.json())
          .then((user) => {
            if (currentUser.id === user.id) {
              setUserRole(role.name);
            }
            let newRole = {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              role: role.name,
              id: role.id,
            };
            r = [...r, newRole];
          })
          .then(() => {
            setDetailRoles(r);
            setTimeout(() => setIsLoading(false), 700);
          });
      });
  }, [project]);

  function getNameById(id) {
    let user = project.users.filter((user) => user.id === id);
    return `${user[0].first_name} ${user[0].last_name}`;
  }

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProject(data);
        console.log(data);
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    setTicketData();
  }, [project]);

  let history = useHistory();

  const roleOptions = ["Project Lead", "Developer", "Designer", "QA"];

  const roleColumns = [
    {
      field: "action",
      headerName: "Delete Role",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field === "id" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          console.log(thisRow.id, null, 4);

          let updatedRoles = detailRoles.filter(
            (dRole) => dRole.id !== thisRow.id
          );

          setDetailRoles(updatedRoles);
          fetch(`/api/roles/${thisRow.id}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
          });
        };

        return <Button onClick={onClick}>Remove</Button>;
      },
    },
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

  const ticketColumns = [
    {
      field: "action",
      headerName: "View Details",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field === "id" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          history.push(`/ticket/${JSON.stringify(thisRow.id, null, 4)}`);
        };

        return <Button onClick={onClick}>View Ticket</Button>;
      },
    },
    { field: "title", headerName: "Ticket Name", width: 110 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "priority", headerName: "Priority", width: 75 },
    { field: "category", headerName: "Category", width: 125 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "assignee", headerName: "Ticket Assigned to", width: 150 },
    { field: "submitter", headerName: "Ticket Created by", width: 150 },
    { field: "id", headerName: "ID", width: 50 },
  ];

  function setTicketData() {
    let ticketsData = [];
    project &&
      project.tickets.map((ticket) => {
        let ticketData = {
          assignee: getNameById(ticket.assignee_id),
          submitter: getNameById(ticket.submitter_id),
          // project: getProjectNameById(ticket.project_id),
          category: ticket.category,
          description: ticket.description,
          priority: ticket.priority,
          id: ticket.id,
          status: ticket.status,
          title: ticket.title,
        };
        ticketsData.push(ticketData);
      });
    setTicketRows(ticketsData);
  }

  return (
    <>
      {!isLoading ? (
        <>
          <>
            <div style={{ textAlign: "center" }}>
              <Typography style={{ padding: "20px" }}>
                <em>
                  {!isLoading
                    ? userRole === "Project Lead"
                      ? "You are a Project Lead. You Can Can Update, Add, and Remove Team Member Roles."
                      : `Your Role: ${userRole}`
                    : "No Role Assigned"}
                </em>
                {userRole === "ProjectLead" && (
                  <em>
                    Project Leads Can Update, Add, and Remove Team Member Roles
                  </em>
                )}
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={() => history.push("/create-ticket")}>
                Add Ticket
              </Button>
              {userRole === "Project Lead" && <Button>Delete Project</Button>}
            </div>
          </>
          {users && userRole === "Project Lead" && (
            <>
              <Typography style={{ textAlign: "center", padding: "5px" }}>
                Update & Add Roles
              </Typography>
              <Box justifyContent="center" style={{ display: "flex" }}>
                <FormControl>
                  <Autocomplete
                    id="combo-box-demo"
                    options={users}
                    getOptionLabel={(option) =>
                      `${option.first_name} ${option.last_name}`
                    }
                    style={{ width: 300 }}
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
              </Box>
            </>
          )}
          {selectedRole && selectedUser && (
            <div style={{ width: "100%", display: "flex" }}>
              <Button
                style={{ margin: "auto", padding: "15px" }}
                onClick={() => {
                  const updatedRoles = detailRoles.map((obj) => {
                    console.log(obj);
                    console.log(selectedUser);
                    if (obj.email === selectedUser.email) {
                      return { ...obj, role: selectedRole };
                    }
                    return obj;
                  });
                  setDetailRoles(updatedRoles);
                }}
              >
                Submit Role
              </Button>
            </div>
          )}

          <Box
            sx={{
              flexGrow: 1,
              width: "80%",
              margin: "auto",

              height: "100%",
              // display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid style={{ margin: "auto" }} container spacing={3}>
              <Grid item>
                <Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="off"
                >
                  {project && (
                    <TextField
                      id="outlined-basic"
                      label="Project Name"
                      variant="outlined"
                      value={project.name}
                      disabled
                    />
                  )}
                  {project && (
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Team Name"
                      value={project.team}
                      multiline
                      rows={1}
                      disabled
                    />
                  )}

                  {project && (
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Project Description"
                      value={project.description}
                      multiline
                      rows={4}
                      disabled
                    />
                  )}
                </Stack>
              </Grid>
              <Grid
                textAlign="center"
                item
                style={{ width: "65%", margin: "auto" }}
              >
                <DataTable
                  columns={roleColumns}
                  rows={detailRoles}
                  pageSize={4}
                  // rowsPerPageOptions={[4]}
                  minimum
                  checkboxSelection={false}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              width: "80%",
              margin: "5vh auto",
              justifyContent: "space-between",
            }}
          >
            {ticketRows[0] && (
              <DataTable columns={ticketColumns} rows={ticketRows}></DataTable>
            )}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "20%",
          }}
        >
          <LinearProgress thickness={5} />
        </Box>
      )}
    </>
  );
}

export default Project;
