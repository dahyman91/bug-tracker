import * as React from "react";
import { useHistory } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar({ setCurrentUser, currentUser }) {
  const [value, setValue] = React.useState(0);
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
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
      style={{ textAlign: "center", marginBottom: "2vh" }}
      centered
    >
      <Tab
        style={{ position: "absolute", right: "5px" }}
        icon={<LogoutIcon />}
        label="Log Out"
        onClick={handlelogout}
      />
      <Tab
        icon={<DashboardIcon />}
        label="Dashboard"
        onClick={() => history.push("/dashboard")}
      />
      <Tab
        icon={<ConfirmationNumberIcon />}
        label="Tickets"
        onClick={() => history.push("/tickets")}
      />
      <Tab
        icon={<AccountTreeIcon />}
        label="Projects"
        onClick={() => history.push("/projects")}
      />
      <Tab
        icon={<GroupWorkIcon />}
        label="Teams"
        onClick={() => history.push("/teams")}
      />

      <Tab
        icon={<PersonPinIcon />}
        style={{ position: "absolute", left: "5px" }}
        label={currentUser.first_name}
      />
    </Tabs>
  );
}
