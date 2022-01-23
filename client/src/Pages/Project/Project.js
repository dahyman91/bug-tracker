import "./Project.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DataTable from "../../Components/DataTable";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

function Project({ currentUser }) {
  const [project, setProject] = useState("");
  const [detailRoles, setDetailRoles] = useState([]);
  const [isLead, setIsLead] = useState(false);
  const [ticketRows, setTicketRows] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    let r = [];
    project &&
      project.roles.map((role) => {
        fetch(`/api/show_user/${role.user_id}`)
          .then((r) => r.json())
          .then((user) => {
            if (currentUser.id === user.id && role.name === "Project Lead") {
              setIsLead(true);
            }
            let newRole = {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              role: role.name,
              id: role.id,
            };
            r = [...r, newRole];
          })
          .then(() => setDetailRoles(r));
      });
  }, [project]);

  function getNameById(id) {
    let user = project.users.filter((user) => user.id === id);
    return `${user[0].first_name} ${user[0].last_name}`;
  }

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => setProject(data));
  }, []);

  useEffect(() => {
    setTicketData();
  }, [project]);

  let history = useHistory();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "First name", width: 130 },
    { field: "last_name", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 190 },
    {
      field: "role",
      headerName: "Role",
      type: "string",
      width: 130,
    },
  ];

  const ticketColumns = [
    {
      field: "action",
      headerName: "View Details",
      width: 150,
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

        return <Button onClick={onClick}>View Ticket</Button>;
      },
    },
    { field: "title", headerName: "Ticket Name", width: 110 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "priority", headerName: "Priority", width: 75 },
    { field: "category", headerName: "Category", width: 125 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "assignee", headerName: "Ticket Assigned to", width: 150 },
    { field: "submitter", headerName: "Ticket Created by", width: 150 },
    { field: "id", headerName: "ID", width: 50 },
  ];

  function setTicketData() {
    let ticketsData = [];
    project &&
      project.tickets.map((ticket) => {
        let ticketData = {
          assignee: getNameById(ticket.assignee_id),
          submitter: getNameById(ticket.submitter_id),
          // project: getProjectNameById(ticket.project_id),
          category: ticket.category,
          description: ticket.description,
          priority: ticket.priority,
          id: ticket.id,
          status: ticket.status,
          title: ticket.title,
        };
        ticketsData.push(ticketData);
      });
    setTicketRows(ticketsData);
  }

  return (
    <>
      <>
        {isLead && (
          <div style={{ textAlign: "center" }}>You Are Project Lead</div>
        )}
      </>
      <Box
        sx={{
          flexGrow: 1,
          width: "80%",
          margin: "auto",
          // display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid style={{ margin: "auto" }} container spacing={8}>
          <Grid item>
            <Stack component="form" spacing={2} noValidate autoComplete="off">
              {project && (
                <TextField
                  id="outlined-basic"
                  label="Project Name"
                  variant="outlined"
                  value={project.name}
                  disabled
                />
              )}
              {project && (
                <TextField
                  id="outlined-multiline-flexible"
                  label="Team Name"
                  value={project.team}
                  multiline
                  rows={1}
                  disabled
                />
              )}

              {project && (
                <TextField
                  id="outlined-multiline-flexible"
                  label="Project Description"
                  value={project.description}
                  multiline
                  rows={4}
                  disabled
                />
              )}
            </Stack>
          </Grid>
          <Grid
            textAlign="center"
            item
            style={{ width: "65%", margin: "auto" }}
          >
            <DataTable
              columns={columns}
              rows={detailRoles}
              minimum
              checkboxSelection={false}
              // width="52%"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "80%",
          margin: "auto",

          justifyContent: "space-between",
        }}
      >
        {ticketRows[0] && (
          <DataTable columns={ticketColumns} rows={ticketRows}></DataTable>
        )}
      </Box>
    </>
  );
}

export default Project;
