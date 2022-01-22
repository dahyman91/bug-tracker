import "./Project.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DataTable from "../../Components/DataTable";
import Grid from "@mui/material/Grid";

function Project({ currentUser }) {
  const [project, setProject] = useState("");
  const [detailRoles, setDetailRoles] = useState([]);
  const [isLead, setIsLead] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    let r = [];
    project &&
      project.roles.map((role) => {
        fetch(`/api/show_user/${role.user_id}`)
          .then((r) => r.json())
          .then((user) => {
            if (currentUser.id === user.id && role.name === "Project Lead") {
              setIsLead(true);
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
          .then(() => setDetailRoles(r));
      });
  }, [project]);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => setProject(data));
  }, []);

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

  return (
    <Box
      sx={{ flexGrow: 1, width: "80%", margin: "auto", textAlign: "center" }}
    >
      {isLead && <div style={{ margin: "auto" }}>You Are Project Lead</div>}
      <Grid style={{ margin: "auto" }} container spacing={8}>
        <Grid item>
          <Stack component="form" spacing={2} noValidate autoComplete="off">
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
        <Grid textAlign="center" item style={{ width: "75%", margin: "auto" }}>
          <DataTable
            columns={columns}
            rows={detailRoles}
            minimum
            checkboxSelection={false}
            // width="52%"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Project;
