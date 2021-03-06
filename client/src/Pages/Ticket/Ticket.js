import "./Ticket.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, Divider } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import ConfirmationModal from "../../Components/ConfirmationModal";
import { Grid, Box, LinearProgress, Typography } from "@material-ui/core";
import Comment from "../../Components/Comment";

function Ticket({ currentUser }) {
  const { id } = useParams();
  const filter = createFilterOptions();

  let history = useHistory();

  const [ticketName, setTicketName] = useState("");
  const [ticket, setTicket] = useState(null);
  const [selectedProject, setSelectedProject] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [ticketDescription, setTicketDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/tickets/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setTicket(data);
        setTicketName(data.title);
        setTicketDescription(data.description);
        setCategory(data.category);
        setStatus(data.status);
        setPriority(data.priority);
        setComments(data.comments.reverse());
      });
  }, []);

  useEffect(() => {
    ticket && getAssigneeName(ticket.assignee_id);
    ticket && getProjectName(ticket.project_id);
  }, [ticket]);

  function getAssigneeName(id) {
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setSelectedUser(data);
      });
  }

  function getProjectName(id) {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setSelectedProject(data);
        setTeamMembers(data.users);
      });
  }

  function deleteTicket(id) {
    fetch(`/api/tickets/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/tickets"));
  }

  function getTimeSincePost(postedDate) {
    let now = new Date();
    const millis = Date.parse(now) - Date.parse(postedDate);
    let string;
    if (millis < 60000) {
      string = "just now";
    } else if (millis < 3600000) {
      let minutes = Math.floor(millis / 60000);
      string = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (3600000 < millis < 1000 * 60 * 60 * 24) {
      let hours = Math.floor(millis / (1000 * 60 * 60));
      string = `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      string = new Date(postedDate).toDateString();
    }
    return string;
  }

  const projects = [];
  currentUser.teams.map((team) =>
    team.projects.map((project) => projects.push(project))
  );
  const categories = ["Feature Request", "Bug", "Design"];
  const statuses = [
    "New",
    "Open",
    "More Information Needed",
    "In Progress",
    "Closed",
  ];
  const priorities = ["Low", "Medium", "High"];

  return (
    <>
      <Typography style={{ textAlign: "center", padding: "20px" }}>
        {ticket && currentUser.id === ticket.submitter_id ? (
          <em>
            You are the submitter of this ticket, you can edit all fields.
          </em>
        ) : (
          <em>
            You are not submitter of this ticket, you can only update the status
            and comment.
          </em>
        )}
      </Typography>

      <>
        {ticket && (
          <Typography style={{ textAlign: "center" }}>
            <b>Created {getTimeSincePost(ticket.created_at)}</b>
          </Typography>
        )}
        {ticket && (
          <Typography style={{ textAlign: "center", marginBottom: "30px" }}>
            <b>Last updated {getTimeSincePost(ticket.updated_at)}</b>
          </Typography>
        )}
        {ticket ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10} md={6}>
              <Stack
                component="form"
                sx={{
                  width: "90%",
                  m: "0 auto 15px",
                }}
                spacing={2}
                noValidate
                autoComplete="off"
              >
                {ticket && (
                  <TextField
                    id="outlined-basic"
                    label="Ticket Name"
                    disabled={currentUser.id !== ticket.submitter_id}
                    variant="outlined"
                    onChange={(e) => setTicketName(e.target.value)}
                    value={ticketName}
                  />
                )}

                <FormControl>
                  <InputLabel htmlFor="status-select">Status</InputLabel>
                  <Select
                    style={{
                      color:
                        currentUser.id !== ticket.submitter_id
                          ? "#2F7C31"
                          : "black",
                    }}
                    labelId="demo-simple-select-label"
                    id="status-select"
                    value={status}
                    placeholder={status}
                    label="Status"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    {statuses.map((status) => {
                      return (
                        <MenuItem value={status} key={status}>
                          {status}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextField
                  disabled={currentUser.id !== ticket.submitter_id}
                  id="outlined-multiline-flexible"
                  label="Ticket Description"
                  onChange={(e) => setTicketDescription(e.target.value)}
                  value={ticketDescription}
                  multiline
                  rows={4}
                />
              </Stack>
            </Grid>
            <Grid item xs={10} md={6}>
              <Stack
                component="form"
                sx={{
                  width: "90%",
                  m: "auto",
                }}
                spacing={2}
                noValidate
                autoComplete="off"
              >
                <FormControl fullWidth>
                  <InputLabel id="user-select-label">
                    Change Project (Currently {selectedProject.name})
                  </InputLabel>
                  <Select
                    disabled={currentUser.id !== ticket.submitter_id}
                    labelId="demo-simple-select-label"
                    id="user-simple-select"
                    value={selectedProject.name}
                    label={`Change Project (Currently ${selectedProject.name})`}
                    onChange={(e) => {
                      setSelectedProject(e.target.value);
                      console.log(e.target.value.id);
                      fetch(`/api/projects/${e.target.value.id}`)
                        .then((r) => r.json())
                        .then((data) => {
                          console.log(data);
                          setTeamMembers(data.users);
                        });
                    }}
                  >
                    {projects.map((project) => {
                      return (
                        <MenuItem value={project} id={project.id}>
                          {project.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="user-select-label">
                    Change Ticket Assignee Currently ({selectedUser.first_name}{" "}
                    {selectedUser.last_name})
                  </InputLabel>
                  <Select
                    disabled={currentUser.id !== ticket.submitter_id}
                    labelId="demo-simple-select-label"
                    id="user-simple-select"
                    value={selectedUser.first_name}
                    label={`Change Ticket Assignee Currently ${selectedUser.first_name} 
              ${selectedUser.last_name}`}
                    onChange={(e) => {
                      setSelectedUser(e.target.value);
                    }}
                  >
                    {teamMembers.map((user) => {
                      return (
                        <MenuItem value={user} id={user.id}>
                          {user.first_name} {user.last_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
                <Autocomplete
                  disabled={currentUser.id !== ticket.submitter_id}
                  value={category}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      setCategory(newValue);
                    } else if (newValue && newValue.inputValue) {
                      setCategory(newValue);
                    } else {
                      setCategory(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    const isExisting = options.some(
                      (option) => inputValue === option.title
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push(inputValue);
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={categories}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }

                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option;
                  }}
                  renderOption={(props, option) => <li {...props}>{option}</li>}
                  sx={{ width: "100%" }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label="Choose or Create Category" />
                  )}
                />
                <FormControl>
                  <InputLabel htmlFor="priority-select">Priority</InputLabel>
                  <Select
                    disabled={currentUser.id !== ticket.submitter_id}
                    id="priority-select"
                    value={priority}
                    label="Priority"
                    onChange={(e) => {
                      setPriority(e.target.value);
                    }}
                  >
                    {priorities.map((priority) => {
                      return (
                        <MenuItem value={priority} key={priority}>
                          {priority}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}

        <div
          style={{
            padding: "20px",
            textAlign: "center",
            width: "100%",
          }}
        >
          <ConfirmationModal
            title={"Delete Team"}
            body={"Are you sure you want to delete this team?"}
            submitFunction={() => deleteTicket(ticket.id)}
            open={open}
            setOpen={setOpen}
          />
          <Button
            variant="contained"
            onClick={() =>
              fetch(`/api/tickets/${ticket.id}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  assignee_id: selectedUser.id,
                  project_id: selectedProject.id,
                  priority,
                  status,
                  title: ticketName,
                  description: ticketDescription,
                  category,
                }),
              }).then(() => history.push("/tickets"))
            }
          >
            Update Ticket
          </Button>
          <br></br>
          <Button
            variant="contained"
            style={{
              color: "#C95036",
              backgroundColor: "white",
              marginTop: "10px",
            }}
            onClick={() => setOpen(true)}
          >
            Delete Ticket
          </Button>
        </div>
        <Divider style={{ margin: "auto" }} width="80%"></Divider>
      </>
      <h3 style={{ textAlign: "center", padding: "20px" }}>Comments</h3>
      <div style={{ width: "100%", display: "flex" }}>
        <FormControl style={{ margin: "auto", width: "40vw" }}>
          <TextField
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ margin: "20px auto" }}
            onClick={() => {
              if (newComment.length) {
                let fullComment = {
                  message: newComment,
                  user_id: currentUser.id,
                  ticket_id: ticket.id,
                };
                fetch("/api/comments", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(fullComment),
                });
                let stateComment = { ...fullComment, created_at: new Date() };
                setComments([stateComment, ...comments]);
                setNewComment("");
              }
            }}
          >
            Add Comment
          </Button>
        </FormControl>
      </div>
      <div style={{ padding: 14, textAlign: "center" }}>
        {comments.reverse().map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </>
  );
}

export default Ticket;
