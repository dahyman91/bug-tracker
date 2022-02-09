import * as React from "react";
import { useHistory } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

import "./Navbar.css";

export default function Navbar({
  setCurrentUser,
  currentUser,
  value,
  setValue,
}) {
  let history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handlelogout() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
        history.push("/log-in");
      }
    });
  }

  return (
    <Tabs
      variant="fullWidth"
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
      style={{ marginBottom: "2vh" }}
      centered
    >
      <Tab
        className="tab-left"
        icon={<PersonPinIcon />}
        label={currentUser.first_name}
        disabled
      />
      <Tab
        icon={<DashboardIcon />}
        label="Dashboard"
        value="two"
        onClick={() => history.push("/dashboard")}
      />
      <Tab
        icon={<ConfirmationNumberIcon />}
        label="Tickets"
        value="three"
        onClick={() => history.push("/tickets")}
      />
      <Tab
        icon={<AccountTreeIcon />}
        label="Projects"
        value="four"
        onClick={() => history.push("/projects")}
      />
      <Tab
        icon={<GroupWorkIcon />}
        label="Teams"
        value="fove"
        onClick={() => history.push("/teams")}
      />

      <Tab
        className="tab-right"
        icon={<LogoutIcon />}
        value="one"
        label="Log Out"
        onClick={handlelogout}
      />
    </Tabs>
  );
}

const style = {
  leftIcon: {
    "@media and screen (max-width: 1000px)": {
      position: "absolute",
      left: "5px",
    },
  },
};
