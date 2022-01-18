import * as React from "react";
import { useHistory } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const actions = [
  {
    icon: <ConfirmationNumberIcon />,
    name: "Create Ticket",
    route: "/create-ticket",
  },
  {
    icon: <AccountTreeIcon />,
    name: "Create Project",
    route: "/create-project",
  },
  { icon: <GroupWorkIcon />, name: "Create Team", route: "/create-team" },
];

export default function SideNav() {
  let history = useHistory();
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: "50%", left: 25 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => history.push(action.route)}
        />
      ))}
    </SpeedDial>
  );
}
