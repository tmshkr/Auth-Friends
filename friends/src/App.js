import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PrivateRoute from "./components/auth/PrivateRoute";
import LoginForm from "./components/auth/LoginForm";
import Friends from "./components/Friends";
import FriendForm from "./components/FriendForm";

function App() {
  return (
    <Router>
      <main className="app">
        <header className="top">
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/friends">Friends</Link>
          </nav>
        </header>

        <Switch>
          <PrivateRoute exact path="/friends" component={Friends} />
          <PrivateRoute exact path="/friends/add" component={FriendForm} />
          <PrivateRoute exact path="/friends/edit/:id" component={FriendForm} />
          <Route path="/login" component={LoginForm} />
          <Route component={LoginForm} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
