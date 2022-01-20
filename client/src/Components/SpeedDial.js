import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function SideNav({ currentUser, setCurrentUser }) {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          setActions([
            {
              icon: <ConfirmationNumberIcon />,
              name: "Create Ticket",
              route: "/create-ticket",
              isDisabled: user.teams[0] ? false : true,
            },
            {
              icon: <AccountTreeIcon />,
              name: "Create Project",
              route: "/create-project",
              isDisabled: user.teams[0] ? false : true,
            },
            {
              icon: <GroupWorkIcon />,
              name: "Create Team",
              route: "/create-team",
            },
          ]);
        });
      }
    });
  }, []);

  let history = useHistory();

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: "50%", left: 25 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          disabled={action.isDisabled}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => history.push(action.route)}
        />
      ))}
    </SpeedDial>
  );
}
