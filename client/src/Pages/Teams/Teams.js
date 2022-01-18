import { useEffect, useState } from "react";
import TeamAccordian from "../../Components/TeamAccordian";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import ListItemText from "@mui/material/ListItemText";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Teams({ setCurrentUser, currentUser }) {
  const [teams, setTeams] = useState([]);
  const [adminTeams, setAdminTeams] = useState([]);

  function fetchInfo() {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          setTeams(user.teams);
          setAdminTeams(user.admin_teams.map((team) => team.team_id));
        });
      }
    });
  }
  useEffect(() => {
    fetchInfo();
  }, []);

  function handleRemoveTeam(id) {
    const updatedTeams = teams.filter((t) => t.id !== id);
    fetch(`/api/destroy_membership/${currentUser.id}/${id}`);
    setTeams(updatedTeams);
  }

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <Typography>My Teams</Typography>
      {teams.map((team) => (
        <TeamAccordian
          adminTeams={adminTeams}
          team={team}
          handleRemoveTeam={handleRemoveTeam}
        />
      ))}
    </div>
  );
}
