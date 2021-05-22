import React from "react";

import Graph from "./Graph";
import Rate from "./Rate";

import "../styles/main.css";

const Dashboard = ({ db }) => {
    return (
        <div className="dashboard">
            <div className="multi-graphs">
                <Graph db={db} type="accel_x" lims={{ min: -12, max: -8 }} color="red" />
                <Graph db={db} type="accel_y" lims={{ min: -4, max: 4 }} color="orange" />
                <Graph db={db} type="accel_z" lims={{ min: -4, max: 4 }} color="#ffe100" />
            </div>
            <Rate db={db} />
        </div>
    );
};

export default Dashboard;
