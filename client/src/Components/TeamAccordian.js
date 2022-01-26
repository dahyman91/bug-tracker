import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";

function TeamAccordian({
  team,
  adminTeams,
  handleRemoveTeam,
  handleDeleteTeam,
}) {
  const [members, setMembers] = useState(team.users);
  const [isAdminArr, setIsAdminArr] = useState({});
  const [open, setOpen] = useState(false);

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
  }, [members, team.id]);

  function handleRemoveMember(id) {
    let updatedTeam = members.filter((member) => member.id !== id);
    fetch(`/api/destroy_membership/${id}/${team.id}`);
    setMembers(updatedTeam);
  }

  let history = useHistory();

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Team Name: {team.name}</Typography>
        </AccordionSummary>
        {adminTeams.includes(team.id) && (
          <Typography style={{}}>
            <em>You Have Admin Priviledges</em>
          </Typography>
        )}
        <AccordionDetails style={{}}>
          <Typography>Team Description: {team.description}</Typography>
          <List dense={false}>
            <ListSubheader>Members</ListSubheader>
            {members.map((user, index) => {
              return (
                <div>
                  <ListItem
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography style={{ fontSize: "14px" }}>
                      {isAdminArr[user.id] && "Admin: "}
                      {user.first_name} {user.last_name}
                      (email {user.email})
                    </Typography>
                    {adminTeams.includes(team.id) && (
                      <div>
                        <Button onClick={() => handleRemoveMember(user.id)}>
                          remove member
                        </Button>
                        {isAdminArr[user.id] ? (
                          <Button
                            onClick={() => {
                              setIsAdminArr((isAdminArr) => ({
                                ...isAdminArr,
                                [user.id]: false,
                              }));
                              fetch(`/api/remove_admin/${user.id}/${team.id}`);
                            }}
                          >
                            remove admin priviledges
                          </Button>
                        ) : (
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
                        )}
                      </div>
                    )}
                  </ListItem>
                </div>
              );
            })}
            {team.projects[0] && <ListSubheader>Projects</ListSubheader>}
            {team.projects.map((project) => {
              return (
                <ListItem style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => history.push(`/project/${project.id}`)}
                    style={{ margin: "auto" }}
                  >
                    {project.name}
                  </Button>
                </ListItem>
              );
            })}
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="contained"
                onClick={() => handleRemoveTeam(team.id)}
              >
                Leave Team
              </Button>
              <Button
                variant="contained"
                onClick={() => history.push("/create-project")}
              >
                Add Project
              </Button>
              <Button variant="contained" onClick={() => setOpen(true)}>
                Delete Team
              </Button>
              <ConfirmationModal
                title={"Delete Team"}
                body={"Are you sure you want to delete this team?"}
                submitFunction={() => handleDeleteTeam(team.id)}
                open={open}
                setOpen={setOpen}
              />
            </div>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TeamAccordian;
