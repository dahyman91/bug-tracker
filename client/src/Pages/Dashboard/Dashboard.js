import { useState, useEffect } from "react";
import BasicModal from "../../Components/Modal";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
import { useModal } from "../../Components/ModalContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import InboxIcon from "@mui/icons-material/Inbox";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

function Dashboard({ currentUser, setCurrentUser }) {
  const [tickets, setTickets] = useState([]);
  const [submittedTickets, setSubmittedTickets] = useState([]);
  const { open, setOpen } = useModal();
  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          setTickets(user.tickets_as_assignee);
          setSubmittedTickets(user.tickets_as_submitter);
          user.tickets_as_assignee[0] && setOpen(false);
        });
      }
    });
  }, []);

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );

  let history = useHistory();

  const lowPriorityTickets = tickets.filter(
    (ticket) => ticket.priority === "Low"
  ).length;
  const mediumPriorityTickets = tickets.filter(
    (ticket) => ticket.priority === "Medium"
  ).length;
  const highPriorityTickets = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  const newTickets = tickets.filter((ticket) => ticket.status === "New").length;
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;
  const needMoreInfoTickets = tickets.filter(
    (ticket) => ticket.status === "More Information Needed"
  ).length;
  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;
  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  const bugTickets = tickets.filter(
    (ticket) => ticket.category === "Bug"
  ).length;

  const featureReqTickets = tickets.filter(
    (ticket) => ticket.category === "Feature Request"
  ).length;

  const designTickets = tickets.filter(
    (ticket) => ticket.category === "Design"
  ).length;

  const otherTickets = tickets.filter(
    (ticket) =>
      ticket.category !== "Bug" &&
      ticket.category !== "Feature Request" &&
      ticket.category !== "Design"
  ).length;

  const ticketsByStatusOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Tickets by Status",
      },
    },
  };
  const ticketsByPriorityOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Tickets by Priority",
      },
    },
  };
  const ticketsByCategoryOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Tickets by Category",
      },
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Tickets by Priority",
      },
    },
  };

  const ticketsByPriorityData = {
    labels: ["Low", "Medium", "High"],

    datasets: [
      {
        label: "# of Tickets",
        data: [lowPriorityTickets, mediumPriorityTickets, highPriorityTickets],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const ticketsByCategoryData = {
    labels: ["Bug", "Feature Request", "Design", "Other"],

    datasets: [
      {
        label: "# of Tickets",
        data: [bugTickets, featureReqTickets, designTickets, otherTickets],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const ticketsByStatusData = {
    labels: ["New", "Open", "More Information Needed", "In Progress", "Closed"],

    datasets: [
      {
        label: "# of Tickets",
        data: [
          newTickets,
          openTickets,
          needMoreInfoTickets,
          inProgressTickets,
          closedTickets,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {!currentUser.tickets && (
        <BasicModal currentUser={currentUser} open={open} setOpen={setOpen} />
      )}
      <div className="chart-container">
        <div className="chart">
          <Bar
            options={ticketsByPriorityOptions}
            data={ticketsByPriorityData}
          />
          <Bar options={ticketsByStatusOptions} data={ticketsByStatusData} />
        </div>
        <div>
          <Doughnut
            options={ticketsByCategoryOptions}
            data={ticketsByCategoryData}
          />
        </div>

        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List dense>
              <Typography textAlign={"center"}>
                Recent Assigned Tickets
              </Typography>
              {tickets
                .slice(0, 5)
                .reverse()
                .map((ticket) => {
                  return (
                    <ListItem
                      onClick={() => history.push(`/ticket/${ticket.id}`)}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={ticket.title}
                          // secondary={ticket.project_id}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List dense>
              <Typography textAlign={"center"}>
                Recent Submitted Tickets
              </Typography>
              {submittedTickets
                .slice(0, 5)
                .reverse()
                .map((ticket) => {
                  return (
                    <ListItem
                      onClick={() => history.push(`/ticket/${ticket.id}`)}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={ticket.title}
                          // secondary={ticket.project_id}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
