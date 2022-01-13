import * as React from "react";
import { useHistory } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";

export default function Navbar({ setCurrentUser }) {
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
        icon={<PhoneIcon />}
        label="Log Out"
        onClick={handlelogout}
      />
      <Tab
        icon={<PhoneIcon />}
        label="Dashboard"
        onClick={() => history.push("/dashboard")}
      />
      <Tab
        icon={<FavoriteIcon />}
        label="Tickets"
        onClick={() => history.push("/tickets")}
      />
      <Tab
        icon={<PersonPinIcon />}
        label="Teams"
        onClick={() => history.push("/teams")}
      />
      <Tab
        icon={<PersonPinIcon />}
        label="Projects"
        onClick={() => history.push("/projects")}
      />
      <Tab
        icon={<PersonPinIcon />}
        style={{ position: "absolute", left: "5px" }}
        label="Avatar"
      />
    </Tabs>
  );
}
