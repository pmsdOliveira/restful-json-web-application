import React from "react";

import Profile from "./Profile";
import Graph from "./Graph";
import CurrentRateForm from "./CurrentRateForm";

import "../styles/main.css";

const Modal = () => {
    return (
        <div>
            <div className="circle-big"></div>
            <div className="circle-medium"></div>
            <div className="circle-small"></div>
            <div id="l-modal">
                <Profile />
                <Graph />
                <CurrentRateForm />
            </div>
        </div>
    );
};

export default Modal;
