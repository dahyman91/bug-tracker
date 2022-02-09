import { useEffect, useState } from "react";
import TeamAccordian from "../../Components/TeamAccordian";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

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

  function handleDeleteTeam(id) {
    const updatedTeams = teams.filter((t) => t.id !== id);
    fetch(`/api/teams/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    setTeams(updatedTeams);
  }

  let history = useHistory();

  return (
    <>
      <div
        style={{
          width: "60%",
          margin: "auto",
          textAlign: "center",
          height: "100vh",
        }}
      >
        <Typography style={{ fontSize: "1.1rem" }}>My Teams</Typography>
        <Button
          variant="contained"
          onClick={() => history.push("/create-team")}
          style={{ margin: "5px auto 10px" }}
        >
          Add New Team
        </Button>
        {teams &&
          teams.map((team) => (
            <TeamAccordian
              style={{}}
              fetchInfo={fetchInfo}
              currentUser={currentUser}
              adminTeams={adminTeams}
              team={team}
              handleRemoveTeam={handleRemoveTeam}
              handleDeleteTeam={handleDeleteTeam}
            />
          ))}
      </div>
    </>
  );
}
