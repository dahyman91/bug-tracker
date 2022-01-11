import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }, []);
  console.log(currentUser);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <SignUp setCurrentUser={setCurrentUser} />
        </Route>
        <Route exact currentUser={currentUser} path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
