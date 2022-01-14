import { useEffect } from "react";
import "./Projects.css";

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
  const projects = [];
  currentUser.teams.map((team) =>
    team.projects.map((project) => projects.push(project))
  );
  console.log(projects);

  return (
    <div>
      {projects.map((project) => {
        return <p>{project.name}</p>;
      })}
    </div>
  );
}

export default Projects;
