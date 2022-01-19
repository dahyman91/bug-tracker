import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function SideNav({ currentUser, setCurrentUser }) {
  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }, []);
  const actions = [
    {
      icon: <ConfirmationNumberIcon />,
      name: "Create Ticket",
      route: "/create-ticket",
      isDisabled: currentUser.projects[0] ? false : true,
    },
    {
      icon: <AccountTreeIcon />,
      name: "Create Project",
      route: "/create-project",
      isDisabled: currentUser.teams[0] ? false : true,
    },
    {
      icon: <GroupWorkIcon />,
      name: "Create Team",
      route: "/create-team",
      // isDisabled: currentUser.tickets ? false : true,
    },
  ];
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
