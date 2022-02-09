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
import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
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
      <Accordion style={{ marginBottom: "10px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ margin: "auto" }}>
            Team Name: <b>{team.name}</b>
          </Typography>
        </AccordionSummary>
        {adminTeams.includes(team.id) && (
          <Typography style={{}}>
            <em>You Have Admin Privileges</em>
          </Typography>
        )}
        <AccordionDetails style={{}}>
          <Typography>Team Description: {team.description}</Typography>
          <List dense={false}>
            <ListSubheader
              style={{
                float: "left",
                color: "black",
                textDecoration: "underline",
              }}
            >
              Members
            </ListSubheader>
            {members.map((user, index) => {
              return (
                <div>
                  <ListItem
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {adminTeams.includes(team.id) && (
                      <div style={{ display: "flex" }}>
                        <Typography style={{ fontSize: "14px" }}>
                          {" "}
                          <b>
                            {user.first_name} {user.last_name}
                          </b>{" "}
                          (email: {user.email})
                          <span>
                            <b>
                              <em>{isAdminArr[user.id] && " Admin"}</em>
                            </b>
                          </span>
                          {isAdminArr[user.id] ? (
                            <Tooltip title="Remove Admin Privileges">
                              <IconButton
                                style={{
                                  backgroundColor: "white",
                                  color: "#C95036",
                                }}
                                variant="contained"
                                onClick={() => {
                                  setIsAdminArr((isAdminArr) => ({
                                    ...isAdminArr,
                                    [user.id]: false,
                                  }));
                                  fetch(
                                    `/api/remove_admin/${user.id}/${team.id}`
                                  );
                                }}
                              >
                                <RemoveIcon />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Give Admin Privileges">
                              <IconButton
                                variant="contained"
                                onClick={() => {
                                  setIsAdminArr((isAdminArr) => ({
                                    ...isAdminArr,
                                    [user.id]: true,
                                  }));
                                  fetch(
                                    `/api/make_admin/${user.id}/${team.id}`
                                  );
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Typography>
                      </div>
                    )}

                    {adminTeams.includes(team.id) && (
                      <div>
                        <Tooltip title="Remove User From Team">
                          <IconButton
                            style={{
                              marginLeft: "10px",
                              backgroundColor: "white",
                              color: "#C95036",
                            }}
                            variant="contained"
                            onClick={() => handleRemoveMember(user.id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Tooltip>
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
                    variant="contained"
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
                paddingRight: "16px",
                marginTop: "10px",
                justifyContent: "center",
              }}
            >
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                onClick={() => history.push("/create-project")}
              >
                Add Project
              </Button>
              {/* <Button
                style={{
                  marginRight: "10px",
                  color: "#C95036",
                  backgroundColor: "white",
                }}
                variant="contained"
                onClick={() => handleRemoveTeam(team.id)}
              >
                Leave Team
              </Button> */}
              {adminTeams.includes(team.id) && (
                <Button
                  style={{
                    backgroundColor: "white",
                    color: "#C95036",
                    // width: "20%",
                  }}
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Delete Team
                </Button>
              )}
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
