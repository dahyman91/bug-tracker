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

  console.log(isLead);
  // console.log(project.roles.map((role) => role));

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

  // console.log(project);

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid style={{ margin: "0 auto" }} container spacing={8}>
        <Grid textAlign="center" item>
          <Stack component="form" spacing={2} noValidate autoComplete="off">
            {isLead && <div>you are the lead</div>}
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
        <Grid textAlign="center" item style={{ width: "55%" }}>
          <DataTable
            columns={columns}
            rows={detailRoles}
            checkboxSelection={false}
            // width="52%"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Project;
