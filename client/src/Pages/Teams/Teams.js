import { useEffect, useState } from "react";
import TeamAccordian from "../../Components/TeamAccordian";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function Teams({ setCurrentUser, currentUser }) {
  const [teams, setTeams] = useState([]);
  const [adminTeams, setAdminTeams] = useState([]);
  console.log(adminTeams);

  function fetchInfo() {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          setTeams(user.teams);
          console.log(user.admin_teams);
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

  let history = useHistory();

  return (
    <>
      <div style={{ textAlign: "center", width: "80%", margin: "auto" }}>
        <Typography>My Teams</Typography>
        <Button onClick={() => history.push("/create-team")} style={{}}>
          Add New Team
        </Button>
        {teams.map((team) => (
          <TeamAccordian
            fetchInfo={fetchInfo}
            currentUser={currentUser}
            adminTeams={adminTeams}
            team={team}
            handleRemoveTeam={handleRemoveTeam}
          />
        ))}
      </div>
    </>
  );
}
