import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Signup from "./Signup";
import SignupSuccess from "./SignupSuccess";
import SignupFailure from "./SignupFailure";
import Login from "./Login";
import LoginFailure from "./LoginFailure";
import Forbidden from "./Forbidden";
import Board from "./Board";
import { AuthProvider } from "../contexts/AuthContext";

import "../styles/main.css";

const Modal = ({ db, auth }) => {
    return (
        <Router>
            <div id="l-modal">
                <AuthProvider>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/signup">
                            <div id="l-modal-signup">
                                <Signup auth={auth} />
                            </div>
                        </Route>
                        <Route exact path="/signup-success">
                            <div id="l-modal-signup">
                                <SignupSuccess />
                            </div>
                        </Route>
                        <Route exact path="/signup-failure">
                            <div id="l-modal-signup">
                                <SignupFailure />
                            </div>
                        </Route>
                        <Route exact path="/login">
                            <div id="l-modal-signup">
                                <Login auth={auth} />
                            </div>
                        </Route>
                        <Route exact path="/login-failure">
                            <div id="l-modal-signup">
                                <LoginFailure />
                            </div>
                        </Route>
                        <Route exact path="/forbidden">
                            <div id="l-modal-signup">
                                <Forbidden />
                            </div>
                        </Route>
                        <Route exact path="/dashboard">
                            <Board db={db} />
                        </Route>
                    </Switch>
                </AuthProvider>
            </div>
        </Router>
    );
};

export default Modal;
