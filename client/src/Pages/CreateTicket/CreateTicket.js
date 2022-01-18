import "./CreateTicket.css";
import { useState, useEffect } from "react";
import AddItemStepper from "../../Components/Stepper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";

function CreateTicket({ currentUser, setCurrentUser }) {
  const [selectedProject, setSelectedProject] = useState([]);
  const [ticketName, setTicketName] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  function handleSubmit(
    selectedUser,
    currentUser,
    selectedProject,
    priority,
    ticketName,
    ticketDescription,
    category
  ) {
    const ticket = {
      assignee_id: selectedUser.id,
      submitter_id: currentUser.id,
      project_id: selectedProject.id,
      priority,
      status,
      title: ticketName,
      description: ticketDescription,
      category,
    };
    fetch("/api/tickets", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ticket),
    });
  }

  let submitParams = [
    selectedUser,
    currentUser,
    selectedProject,
    priority,
    ticketName,
    ticketDescription,
    category,
  ];

  const filter = createFilterOptions();
  console.log(category);

  const categories = ["Feature Request", "Bug", "Design"];
  const statuses = ["New", "Open", "In Progress", "Closed"];
  const priorities = ["Low", "Medium", "High"];

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((data) => {
        setCurrentUser(data);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/projects/${selectedProject.id}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setTeamMembers(data.users);
      });
  }, [selectedProject]);

  let displayTeam = teamMembers ? { display: "none" } : {};

  const projects = [];
  currentUser.teams.map((team) =>
    team.projects.map((project) => projects.push(project))
  );
  console.log(selectedProject);

  const steps = [
    "Add Ticket Description",
    "Add Ticket Details",
    "Review/Submit Ticket",
  ];

  function firstStep() {
    return (
      <div>
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
            <InputLabel id="user-select-label">Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProject}
              label="Project"
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
          {teamMembers && (
            <FormControl fullWidth>
              <InputLabel id="user-select-label">Ticket Assignee</InputLabel>
              <Select
                labelId="user-select-label"
                id="user-select"
                value={selectedUser}
                label="Ticket Asignee"
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
          )}
          <TextField
            id="outlined-multiline-flexible"
            label="Ticket Description"
            onChange={(e) => setTicketDescription(e.target.value)}
            value={ticketDescription}
            multiline
            rows={4}
          />
        </Stack>
      </div>
    );
  }

  function secondStep() {
    return (
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
      </Stack>
    );
  }
  function thirdStep() {
    return <div>three</div>;
  }
  return (
    <div>
      <AddItemStepper
        steps={steps}
        stepOneContent={firstStep}
        stepTwoContent={secondStep}
        stepThreeContent={thirdStep}
        handleSubmit={handleSubmit}
        submitParams={submitParams}
      />
    </div>
  );
}

export default CreateTicket;
