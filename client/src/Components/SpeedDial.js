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
          setActions([
            {
              icon: <ConfirmationNumberIcon />,
              name: "Add New Ticket",
              route: "/create-ticket",
              isDisabled: user.projects[0] ? false : true,
            },
            {
              icon: <AccountTreeIcon />,
              name: "Add New Project",
              route: "/create-project",
              isDisabled: user.teams[0] ? false : true,
            },
            {
              icon: <GroupWorkIcon />,
              name: "Add New Team",
              route: "/create-team",
            },
          ]);
        });
      }
    });
  }, [currentUser]);

  let history = useHistory();

  return (
    <>
      {currentUser && (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          style={{
            position: "sticky",
            bottom: "25px",
            float: "left",
            paddingLeft: "25px",
          }}
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
      )}
    </>
  );
}
