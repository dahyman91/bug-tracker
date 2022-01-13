import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Auth
import LogIn from "./Pages/Login";
import SignUp from "./Pages/Signup";

// Main Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Tickets from "./Pages/Tickets/Tickets";
import Teams from "./Pages/Teams/Teams";
import Projects from "./Pages/Projects/Projects";

// Speed Dial
import CreateTeam from "./Pages/CreateTeam/CreateTeam";
import CreateProject from "./Pages/CreateProject/CreateProject";
import CreateTicket from "./Pages/CreateTicket/CreateTicket";

// Nav Components
import Navbar from "./Components/Navbar";
import SideNav from "./Components/SpeedDial";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }, []);

  if (!currentUser)
    return (
      <div className="app">
        <Switch>
          {/* <Route exact path="/">
          <Redirect to="/log-in" />
        </Route> */}
          <Route exact path="/">
            <SignUp currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path="/log-in">
            <LogIn currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
      </div>
    );

  if (currentUser)
    return (
      <div className="App">
        <Switch>
          {/* Land on Dashboard */}

          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>

          {/* Speed Dial Routes */}

          <Route exact path="/create-team">
            <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
            <CreateTeam currentUser={currentUser} />
            <SideNav />
          </Route>
          <Route exact path="/create-project">
            <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
            <CreateProject currentUser={currentUser} />
            <SideNav />
          </Route>
          <Route exact path="/create-ticket">
            <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
            <CreateTicket currentUser={currentUser} />
            <SideNav />
          </Route>

          {/* Main Pages */}

          <Route exact path="/dashboard">
            <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
            <Dashboard currentUser={currentUser} />
            <SideNav />
          </Route>
          <Route exact path="/tickets">
            <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
            <Tickets currentUser={currentUser} />
            <SideNav />
          </Route>
          <Route exact path="/teams">
            <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
            <Teams setCurrentUser={setCurrentUser} currentUser={currentUser} />
            <SideNav />
          </Route>
          <Route exact path="/projects">
            <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
            <Projects currentUser={currentUser} />
            <SideNav />
          </Route>
        </Switch>
      </div>
    );
}

export default App;
