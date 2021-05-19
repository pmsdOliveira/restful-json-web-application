import React from "react";
import ReactDOM from "react-dom";
import { firebase } from "../src/initFirebase";

import Modal from "./components/Modal";

ReactDOM.render(
    <React.StrictMode>
        <Modal db={firebase.database()} />
    </React.StrictMode>,
    document.getElementById("root")
);
