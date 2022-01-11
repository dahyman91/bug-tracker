import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import SideNav from "./Components/SpeedDial";
import LogIn from "./Pages/Login";

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
            <SignUp setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path="/log-in">
            <LogIn setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
      </div>
    );

  if (currentUser)
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route exact path="/dashboard">
            <Navbar currentUser={currentUser} />
            <Dashboard currentUser={currentUser} />
            <SideNav />
          </Route>
        </Switch>
      </div>
    );
}

export default App;
