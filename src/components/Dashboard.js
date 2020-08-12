import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "../pages/Home";

import "../styles/Dashboard.css";
import Actor from "../pages/Actor";
import Director from "../pages/Director";
import Film from "../pages/Film";
import FilmActor from "../pages/FilmActor";

export default function Dashboard() {  
  const history = useHistory();

  const redirectLogin = () => {
      history.push('/');
  }

  return (
    <Router>
      <div className="dashboard">
        <Navbar fun={redirectLogin}/>
        <div className="content">
          <Switch>
          <Route path="/dashboard">
            <Redirect to="/home"/>
          </Route>
            <Route path="/home" component={Home}/>
            <Route path="/actor" component={Actor}/>
            <Route path="/director" component={Director}/>
            <Route path="/film" component={Film}/>
            <Route path="/filmactor" component={FilmActor}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
