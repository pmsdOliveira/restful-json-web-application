import React, { useState } from "react";
import Graph from "./Graph";
import MultilineGraph from "./MultilineGraph";

import "../styles/main.css";

const Dashboard = ({ db }) => {
    const [showMultiline, setShowMultiline] = useState(false);

    return (
        <div className="dashboard">
            {showMultiline ? (
                <MultilineGraph db={db} />
            ) : (
                <div className="multi-graphs">
                    <Graph db={db} type="accel_x" lims={{min: -12, max: -8}} color="#F00"/>
                    <Graph db={db} type="accel_y" lims={{min: -2, max: 2}} color="#0F0"/>
                    <Graph db={db} type="accel_z" lims={{min: -1, max: 1}} color="#00F"/>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
