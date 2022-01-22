import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ModalProvider from "./Components/ModalContext";

// Auth
import LogIn from "./Pages/Login";
import SignUp from "./Pages/Signup";

// Main Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Tickets from "./Pages/Tickets/Tickets";
import Teams from "./Pages/Teams/Teams";
import Projects from "./Pages/Projects/Projects";
import Project from "./Pages/Project/Project";
import Ticket from "./Pages/Ticket/Ticket";

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
      <ModalProvider>
        <div className="App">
          <Switch>
            {/* Land on Dashboard */}

            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>

            {/* Speed Dial Routes */}

            <Route exact path="/create-team">
              <Navbar
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <CreateTeam currentUser={currentUser} />
              <SideNav
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>
            <Route exact path="/create-project">
              <Navbar
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <CreateProject
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
              <SideNav
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>
            <Route exact path="/create-ticket">
              <Navbar
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <CreateTicket
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <SideNav
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>

            {/* Main Pages */}

            <Route exact path="/dashboard">
              <Navbar
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <Dashboard
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
              <SideNav
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>
            <Route exact path="/tickets">
              <Navbar
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <Tickets
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <SideNav
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>
            <Route exact path="/teams">
              <Navbar
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <Teams
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <SideNav
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>
            <Route exact path="/projects">
              <Navbar
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <Projects
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
              <SideNav
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>

            {/* Specific Product and Ticket Routes */}

            <Route exact path="/project/:id">
              <Navbar
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <Project currentUser={currentUser} />
              <SideNav
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>

            <Route exact path="/ticket/:id">
              <Navbar
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <Ticket currentUser={currentUser} />
              <SideNav
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>
          </Switch>
        </div>
      </ModalProvider>
    );
}

export default App;
