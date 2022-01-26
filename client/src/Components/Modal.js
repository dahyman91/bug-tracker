import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, currentUser }) {
  const handleOpen = () => setOpen(true);

  let history = useHistory();

  let teams = currentUser.teams ? currentUser.teams[0] : null;
  let projects = currentUser.projects ? currentUser.projects[0] : null;
  let tickets = currentUser.tickets ? currentUser.tickets[0] : null;

  return (
    <div>
      {tickets && <Button onClick={handleOpen}>Open modal</Button>}
      {!tickets && (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography>
              <h3 style={{ textAlign: "center" }}>
                Welcome to your new bug tracker tool!
              </h3>
              <br />
              <br />
              Use this app to keep track of bugs or even plan and update your
              progress on entire projects.
              <br />
              <br />
              To get started,
              <b>
                {" "}
                first create a team and add any other user who has signed up.{" "}
              </b>
              Later you can specify adminitrators and remove users on the Team
              page.
              <br />
              <br />
              <b>
                Second, create a project and assign your team members roles.
              </b>
              If you designate yourself as the 'Project Lead,' you will be able
              to update roles on the Project's page.
              <br />
              <br />
              <b>Third, create tickets and assign them to specific users.</b> If
              you are the assignee of the ticket, you will be able to update
              that ticket's status. If you are the submitter, you will be able
              to update all of the ticket's details
              <br />
              <br />
              *You will continue to be greeted by this message until you are
              assigned a ticket*
            </Typography>

            <Box
              sx={{
                margin: "auto",
                maxWidth: 560,
                bgcolor: "background.paper",
              }}
            >
              <List>
                {teams ? (
                  <ListItem onClick={() => history.push("/create-team")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText primary="1: You are on a team!" />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem onClick={() => history.push("/create-team")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <RadioButtonUncheckedIcon />
                      </ListItemIcon>
                      <ListItemText primary="1: Add New Team" />
                    </ListItemButton>
                  </ListItem>
                )}
                {projects ? (
                  <ListItem onClick={() => history.push("/create-project")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText primary="2: You have been assigned a role in a project!" />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem onClick={() => history.push("/create-project")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <RadioButtonUncheckedIcon />
                      </ListItemIcon>
                      <ListItemText primary="2: Add New Project" />
                    </ListItemButton>
                  </ListItem>
                )}
                {tickets ? (
                  <ListItem onClick={() => history.push("/create-ticket")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText primary="3: You have work to do!" />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem onClick={() => history.push("/create-ticket")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <RadioButtonUncheckedIcon />
                      </ListItemIcon>
                      <ListItemText primary="3: Add New Ticket" />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
}
