import React, { useState, useEffect } from "react";

import "../styles/main.css";

const Rate = ({ db }) => {
    // React Hooks
    const [serverCurrentRate, setServerCurrentRate] = useState(1.0);
    const [clientCurrentRate, setClientCurrentRate] = useState(1.0);

    useEffect(() => {
        const listener = db.ref("config/current_rate").on("value", (snapshot) => {
            const data = snapshot.val();
            setServerCurrentRate(data);
        });

        return () => db.ref("config/current_rate").off("value", listener);
    }, [serverCurrentRate]);

    const putRequest = async () => {
        const requestOptions = {
            method: "PUT",
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/updateRate/api/v1.0/" + clientCurrentRate + ".0",
                requestOptions
            );

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (event) => {
        putRequest();
        event.preventDefault();
    };

    return (
        <div className="currentRate">
            <form onSubmit={handleSubmit}>
                <div className="rateGrid">
                    <div className="rate-top-left">Current Rate</div>
                    <div className="rate-top-right">{serverCurrentRate}</div>
                    <div className="rate-bottom-left">
                        <input type="submit" value="Change" />
                    </div>
                    <div className="rate-bottom-right">
                        <input
                            name="currentRate"
                            type="text"
                            value={clientCurrentRate}
                            onChange={(e) => {
                                setClientCurrentRate(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Rate;
