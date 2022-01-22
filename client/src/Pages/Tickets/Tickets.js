import "./Tickets.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

import { GridApi, GridCellValue } from "@mui/x-data-grid";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DataTable from "../../Components/DataTable";

function Tickets({ currentUser, setCurrentUser }) {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState(0);
  const [submittedTickets, setSubmittedTickets] = useState(null);
  const [openTickets, setOpenTickets] = useState(null);
  const [closedTickets, setClosedTickets] = useState(null);
  const [projects, setProjects] = useState([]);

  let history = useHistory();

  function getNameById(id) {
    let user = users.filter((user) => user.id === id);
    return `${user[0].first_name} ${user[0].last_name}`;
  }

  function getProjectNameById(id) {
    let project = projects.filter((project) => project.id == id);
    return project[0]?.name ?? "No Role Assigned";
  }

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          setProjects(user.projects);
        });
      }
    }, []);

    fetch(`/api/users/`)
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setSubmittedTicketsData();
    setOpenTicketsData();
    setClosedTicketsData();
  }, [users]);

  // Data/Data Table

  function setSubmittedTicketsData() {
    let submittedTickets = [];
    users[0] &&
      projects[0] &&
      currentUser.tickets_as_submitter.map((ticket) => {
        console.log(ticket);
        let ticketData = {
          assignee: getNameById(ticket.assignee_id),
          submitter: getNameById(ticket.submitter_id),
          project: getProjectNameById(ticket.project_id),
          category: ticket.category,
          description: ticket.description,
          priority: ticket.priority,
          id: ticket.id,
          status: ticket.status,
          title: ticket.title,
        };
        return submittedTickets.push(ticketData);
      });
    setSubmittedTickets(submittedTickets);
  }

  function setOpenTicketsData() {
    let openTickets = [];
    users[0] &&
      projects[0] &&
      currentUser.tickets_as_assignee
        .filter((ticket) => ticket.status !== "Closed")
        .map((ticket) => {
          let ticketData = {
            assignee: getNameById(ticket.assignee_id),
            submitter: getNameById(ticket.submitter_id),
            project: getProjectNameById(ticket.project_id),
            category: ticket.category,
            description: ticket.description,
            priority: ticket.priority,
            id: ticket.id,
            status: ticket.status,
            title: ticket.title,
          };
          return openTickets.push(ticketData);
        });
    setOpenTickets(openTickets);
  }
  function setClosedTicketsData() {
    let closedTickets = [];
    users[0] &&
      projects[0] &&
      currentUser.tickets_as_assignee
        .filter((ticket) => ticket.status === "Closed")
        .map((ticket) => {
          let ticketData = {
            assignee: getNameById(ticket.assignee_id),
            submitter: getNameById(ticket.submitter_id),
            project: getProjectNameById(ticket.project_id),
            category: ticket.category,
            description: ticket.description,
            priority: ticket.priority,
            id: ticket.id,
            status: ticket.status,
            title: ticket.title,
          };
          return closedTickets.push(ticketData);
        });
    setClosedTickets(closedTickets);
  }

  const columns = [
    { field: "title", headerName: "Name", width: 100 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "priority", headerName: "Priority", width: 100 },
    { field: "category", headerName: "Category", width: 100 },
    { field: "project", headerName: "Project", width: 200 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "assignee", headerName: "Ticket Assigned to", width: 300 },
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "action",
      headerName: "View Details",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field === "id" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          history.push(`/ticket/${JSON.stringify(thisRow.id, null, 4)}`);
        };

        return <Button onClick={onClick}>Click</Button>;
      },
    },
  ];

  // Tabs Logic

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <Typography>My Tickets</Typography>

      <Button onClick={() => history.push("/create-ticket")} style={{}}>
        Add New Ticket
      </Button>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {openTickets && <Tab label="My Open Tickets" {...a11yProps(0)} />}
          {closedTickets && <Tab label="My Closed Tickets" {...a11yProps(1)} />}
          {submittedTickets && (
            <Tab label="Submitted Tickets" {...a11yProps(2)} />
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DataTable
          columns={columns}
          rows={openTickets}
          checkboxSelection={false}
          width={"100%"}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataTable
          columns={columns}
          rows={closedTickets}
          checkboxSelection={false}
          width={"100%"}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataTable
          columns={columns}
          rows={submittedTickets}
          checkboxSelection={false}
          width={"100%"}
        />
      </TabPanel>
    </Box>
  );
}

export default Tickets;
