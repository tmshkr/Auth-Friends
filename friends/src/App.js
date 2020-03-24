import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PrivateRoute from "./components/auth/PrivateRoute";
import LoginForm from "./components/auth/LoginForm";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected">
            <h2>hello</h2>
          </PrivateRoute>
          <Route path="/login" component={LoginForm} />
          <Route component={LoginForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
