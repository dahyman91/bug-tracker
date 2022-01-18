import "./Ticket.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";

function Ticket({ currentUser }) {
  const { id } = useParams();
  const filter = createFilterOptions();

  const [assigneeName, setAssigneeName] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isSumitter, setIsSubmitter] = useState(false);
  const [ticketName, setTicketName] = useState("");
  const [ticket, setTicket] = useState(null);
  const [selectedProject, setSelectedProject] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [ticketDescription, setTicketDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

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
      });
  }, []);

  useEffect(() => {
    ticket && getAssigneeName(ticket.assignee_id);
    ticket && getSubmitterName(ticket.submitter_id);
    ticket && getProjectName(ticket.project_id);
  }, [ticket]);

  function getAssigneeName(id) {
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setSelectedUser(data);
        setAssigneeName(`${data.first_name} ${data.last_name}`);
      });
  }
  function getSubmitterName(id) {
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (currentUser.id === id) {
          setIsSubmitter(true);
        }
        setSubmitterName(`${data.first_name} ${data.last_name}`);
      });
  }
  function getProjectName(id) {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProjectName(data.name);
        setTeamMembers(data.users);
        setSelectedProject(data);
      });
  }

  useEffect(() => {
    fetch(`/api/teams/${id}`).then((r) => r.json());
    // .then((data) => console.log("team", data));
  }, []);

  const projects = [];
  currentUser.teams.map((team) =>
    team.projects.map((project) => projects.push(project))
  );
  const categories = ["Feature Request", "Bug", "Design"];
  const statuses = ["New", "Open", "In Progress", "Closed"];
  const priorities = ["Low", "Medium", "High"];

  return (
    <>
      {isSumitter && <div>you are submitter</div>}
      <Stack
        component="form"
        sx={{
          width: "40ch",
          m: "auto",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Ticket Name"
          variant="outlined"
          onChange={(e) => setTicketName(e.target.value)}
          value={ticketName}
        />

        <FormControl fullWidth>
          <InputLabel id="user-select-label">
            Change Project (Currently {selectedProject.name})
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="user-simple-select"
            value={selectedProject.name}
            label={`Change Project (Currently ${selectedProject.name})`}
            onChange={(e) => {
              setSelectedProject(e.target.value);
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
        </FormControl>

        <TextField
          id="outlined-multiline-flexible"
          label="Ticket Description"
          onChange={(e) => setTicketDescription(e.target.value)}
          value={ticketDescription}
          multiline
          rows={4}
        />
        <Autocomplete
          value={category}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setCategory(newValue);
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setCategory(newValue);
            } else {
              setCategory(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
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
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option;
          }}
          renderOption={(props, option) => <li {...props}>{option}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Choose or Create Category" />
          )}
        />
        <FormControl>
          <InputLabel htmlFor="status-select">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="status-select"
            value={status}
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
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="priority-select">Priority</InputLabel>
          <Select
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
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <Button
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
            })
          }
        >
          Update Ticket
        </Button>
      </Stack>
    </>
  );
}

export default Ticket;
