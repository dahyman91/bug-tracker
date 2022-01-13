import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import ListItemText from "@mui/material/ListItemText";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Teams({ currentUser, setCurrentUser }) {
  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }, []);
  return (
    <div style={{ width: "70%", margin: "auto" }}>
      {currentUser.teams.map((team) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{team.name}</Typography>
          </AccordionSummary>
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
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
