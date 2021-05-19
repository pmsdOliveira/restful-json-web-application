import React from "react";

import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Rate from "./Rate";

import "../styles/main.css";

const Modal = ({ db }) => {
    return (
        <div id="l-modal">
            <Profile />
            <Dashboard db={db} />
            <Rate db={db} />
        </div>
    );
};

export default Modal;
