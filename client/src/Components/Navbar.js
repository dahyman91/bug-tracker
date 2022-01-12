import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
      style={{ textAlign: "center", marginBottom: "2vh" }}
      centered
    >
      <Tab
        style={{ position: "absolute", left: "5px" }}
        icon={<PhoneIcon />}
        label="Log Out"
      />
      <Tab icon={<PhoneIcon />} label="Dashboard" />
      <Tab icon={<FavoriteIcon />} label="Manage Roles" />
      <Tab icon={<PersonPinIcon />} label="My Projects" />
      <Tab icon={<PersonPinIcon />} label="My Tickets" />
      <Tab
        icon={<PersonPinIcon />}
        style={{ position: "absolute", right: "5px" }}
        label="Profile"
      />
    </Tabs>
  );
}
