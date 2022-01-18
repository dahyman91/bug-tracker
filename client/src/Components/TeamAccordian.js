import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import ListItemText from "@mui/material/ListItemText";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TeamAccordian({ team, adminTeams, handleRemoveTeam }) {
  const [members, setMembers] = useState(team.users);

  function handleRemoveMember(id) {
    let updatedTeam = members.filter((member) => member.id !== id);
    fetch(`/api/destroy_membership/${id}/${team.id}`);
    setMembers(updatedTeam);
  }
  return (
    <div>
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
            {members.map((user) => {
              return (
                <ListItem>
                  <ListItemText
                    primary={`${user.first_name} ${user.last_name}`}
                    secondary={user.email}
                  />
                  <ListItemText>
                    {/* {fetch(`/check_admin/${team.id}/${user.id}`)
                        .then((r) => r.json())
                        .then((data) => {
                          return data["is_admin?"];
                        })} */}
                  </ListItemText>
                  {adminTeams.includes(team.id) && (
                    <>
                      <button onClick={() => handleRemoveMember(user.id)}>
                        remove member
                      </button>
                      <button
                        onClick={() =>
                          fetch(`/api/make_admin/${user.id}/${team.id}`)
                        }
                      >
                        make admin
                      </button>
                    </>
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
    </div>
  );
}

export default TeamAccordian;
