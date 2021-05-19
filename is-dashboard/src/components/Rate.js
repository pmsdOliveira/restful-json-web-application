import React, { useState, useEffect, InputRange } from "react";

import "../styles/main.css";

const Rate = ({ db }) => {
    // React Hooks
    const [serverRate, setServerRate] = useState(1.0);
    const [clientRate, setClientRate] = useState(1.0);

    useEffect(() => {
        const listener = db.ref("config/current_rate").on("value", (snapshot) => {
            const data = snapshot.val();
            setServerRate(data);
        });

        return () => db.ref("config/current_rate").off("value", listener);
    }, [serverRate]);

    const handleChange = async (e) => {
        const val = parseFloat(e.target.value);
        setClientRate(val);

        const reqString = (val % 1 != 0) ? val.toString() : val.toString() + ".0";

        const requestOptions = {
            method: "PUT",
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/updateRate/api/v1.0/" + reqString,
                requestOptions
            );

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="rate">
            <input className="rate-slider" type="range" min="0.5" max="10" step="0.5" value={clientRate} onChange={(e) => handleChange(e)}/>
        </form>
    );
};

export default Rate;
