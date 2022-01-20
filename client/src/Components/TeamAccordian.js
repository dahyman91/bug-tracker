import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import ListItemText from "@mui/material/ListItemText";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";

function TeamAccordian({
  team,
  adminTeams,
  handleRemoveTeam,
  currentUser,
  fetchInfo,
}) {
  const [members, setMembers] = useState(team.users);
  const [isAdminArr, setIsAdminArr] = useState({});

  useEffect(() => {
    members.map((member) =>
      fetch(`/api/check_admin/${member.id}/${team.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data[0]["is_admin?"]) {
            setIsAdminArr((isAdminArr) => ({
              ...isAdminArr,
              [member.id]: true,
            }));
          } else {
            setIsAdminArr((isAdminArr) => ({
              ...isAdminArr,
              [member.id]: false,
            }));
          }
        })
    );
  }, []);

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
        {adminTeams.includes(team.id) && <Typography>you are admin</Typography>}
        <AccordionDetails>
          <Typography>{team.description}</Typography>
          <List dense={true}>
            <ListSubheader>Members</ListSubheader>
            {members.map((user, index) => {
              return (
                <ListItem>
                  <ListItemText
                    primary={`${user.first_name} ${user.last_name} ${
                      isAdminArr[user.id] ? "(Admin)" : ""
                    }`}
                    secondary={user.email}
                  />

                  {adminTeams.includes(team.id) && (
                    <>
                      <Button onClick={() => handleRemoveMember(user.id)}>
                        remove member
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAdminArr((isAdminArr) => ({
                            ...isAdminArr,
                            [user.id]: true,
                          }));
                          fetch(`/api/make_admin/${user.id}/${team.id}`);
                        }}
                      >
                        make admin
                      </Button>
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
            <Button onClick={() => handleRemoveTeam(team.id)}>
              Leave Team
            </Button>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TeamAccordian;
