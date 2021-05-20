import React, { useState, useEffect } from "react";

import "../styles/main.css";

const Rate = ({ db }) => {
    // React Hooks
    const [serverRate, setServerRate] = useState(1.0);
    const [clientRate, setClientRate] = useState(1.0);

    useEffect(() => {
        const listener = db.ref("config/current_rate").on("value", (snapshot) => {
            setServerRate(snapshot.val());
        });

        return () => db.ref("config/current_rate").off("value", listener);
    }, [serverRate, db]);

    const handleChange = (e) => {
        setClientRate(parseFloat(e.target.value));

        db.ref("config").set({
            current_rate: clientRate,
        });
    };

    return (
        <div className="rate">
            <div className="rate-header">
                <span>Current Rate</span>
            </div>
            <div className="rate-value">
                <span>{serverRate}</span>
            </div>
            <div className="rate-field">
                <div className="rate-value-left">0.5</div>
                <input
                    className="rate-slider"
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={serverRate}
                    onChange={(e) => handleChange(e)}
                />
                <div className="rate-value-right">10</div>
            </div>
        </div>
    );
};

export default Rate;
