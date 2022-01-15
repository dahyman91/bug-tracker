import { useEffect } from "react";
import "./Projects.css";
import DataTable from "../../Components/DataTable";

function Projects({ currentUser, setCurrentUser }) {
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
  ];
  const projects = [];
  currentUser.teams.map((team) =>
    team.projects.map((project) => projects.push(project))
  );

  return (
    <div>
      {projects && (
        <DataTable
          columns={columns}
          rows={projects}
          checkboxSelection={false}
          width={"50%"}
        />
      )}
    </div>
  );
}

export default Projects;
