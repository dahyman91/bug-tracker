import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import ListItemText from "@mui/material/ListItemText";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Teams({ setCurrentUser }) {
  const [teams, setTeams] = useState([]);
  const [adminTeams, setAdminTeams] = useState([]);
  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          setTeams(user.teams);
          setAdminTeams(user.admin_teams.map((team) => team.team_id));
        });
      }
    });
  }, []);

  // useEffect(() => {}, []);

  function handleRemoveTeam(id) {
    const updatedTeams = teams.filter((t) => t.id !== id);
    setTeams(updatedTeams);
  }

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      {teams.map((team) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{team.name}</Typography>
          </AccordionSummary>
          {adminTeams.includes(team.id) && <Typography>admin</Typography>}
          <AccordionDetails>
            <Typography>{team.description}</Typography>
            <List dense={true}>
              <ListSubheader>Members</ListSubheader>
              {team.users.map((user) => {
                return (
                  <ListItem>
                    <ListItemText
                      primary={`${user.first_name} ${user.last_name}`}
                      secondary={user.email}
                    />
                    {adminTeams.includes(team.id) && (
                      <button
                        onClick={() => {
                          team.users = team.users.filter(
                            (u) => u.id !== user.id
                          );
                          console.log(team.users);
                        }}
                      >
                        remove member
                      </button>
                    )}
                  </ListItem>
                );
              })}
              <ListSubheader>Projects</ListSubheader>
              {team.projects.map((project) => {
                return (
                  <ListItem>
                    <ListItemText primary={`${project.name}`} />
                  </ListItem>
                );
              })}
              <button onClick={() => handleRemoveTeam(team.id)}>
                Leave Team
              </button>
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
