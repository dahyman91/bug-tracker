import { useEffect } from "react";
import "./Projects.css";
import DataTable from "../../Components/DataTable";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function Projects({ currentUser, setCurrentUser }) {
  let history = useHistory();
  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }, []);

  const columns = [
    { field: "id", headerName: "Project ID", width: 135 },
    { field: "name", headerName: "Project Name", width: 200 },
    { field: "description", headerName: "Project Description", width: 450 },
    {
      field: "action",
      headerName: "View Details",
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

          history.push(`/project/${JSON.stringify(thisRow.id, null, 4)}`);
        };
        return <Button onClick={onClick}>Click</Button>;
      },
    },
  ];

  const projects = [];
  currentUser.teams.map((team) =>
    team.projects.map((project) => projects.push(project))
  );

  return (
    <div style={{ textAlign: "center" }}>
      <Typography>My Projects</Typography>
      <Button onClick={() => history.push("/create-project")} style={{}}>
        Add New Project
      </Button>
      {projects && (
        <DataTable
          columns={columns}
          rows={projects}
          checkboxSelection={false}
          width={"80%"}
        />
      )}
    </div>
  );
}

export default Projects;
