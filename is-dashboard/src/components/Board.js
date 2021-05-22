import React from "react";

import Profile from "./Profile";
import Dashboard from "./Dashboard";

export default function Board({ db }) {
    return (
        <div id="l-modal-dashboard">
            <Profile />
            <Dashboard db={db} />
        </div>
    );
}
