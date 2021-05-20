import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Signup from "./Signup";
import Profile from "./Profile";
import Dashboard from "./Dashboard";

import "../styles/main.css";

const Modal = ({ db }) => {
    return (
        <Router>
            <div id="l-modal">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/signup">
                        <div id="l-modal-signup">
                            <Signup />
                        </div>
                    </Route>
                    <Route exact path="/dashboard">
                        <div id="l-modal-dashboard">
                            <Profile />
                            <Dashboard db={db} />
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default Modal;
