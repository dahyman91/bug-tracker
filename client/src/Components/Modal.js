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
  height: 600,
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
                Welcome to your new project management tool!
              </h3>
              <br />
              <br />
              In this app, you can create teams with any other user who has
              signed up. Next you can create projects and connect team members
              by assigning them roles. Finally, you can create tickets to keep
              track of your progress on a project. You can assign yourself a
              ticket, or any other team member who is assigned to that ticket's
              project. You will populate your dashboard once you are on a team,
              included in a project and are included on a ticket. You will
              continue to see this modal on your dashboard, until you have
              completed the three steps below.
              <br />
              <br />
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
                      <ListItemText primary="You are on a team!" />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem onClick={() => history.push("/create-team")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <RadioButtonUncheckedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create a team" />
                    </ListItemButton>
                  </ListItem>
                )}
                {projects ? (
                  <ListItem onClick={() => history.push("/create-project")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText primary="You have been assigned a role in a project!" />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem onClick={() => history.push("/create-project")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <RadioButtonUncheckedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create a project (and assign yourself a role)" />
                    </ListItemButton>
                  </ListItem>
                )}
                {tickets ? (
                  <ListItem onClick={() => history.push("/create-ticket")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText primary="You have work to do!" />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem onClick={() => history.push("/create-ticket")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <RadioButtonUncheckedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Assign yourself (or get assigned) a ticket" />
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
