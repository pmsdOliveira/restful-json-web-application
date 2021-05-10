import React, { useState, useEffect } from "react";
import { firebase } from "../initFirebase";

import "../styles/main.css";

const CurrentRateForm = () => {
    const db = firebase.database();

    // React Hooks
    const [serverCurrentRate, setServerCurrentRate] = useState(1.0);
    const [clientCurrentRate, setClientCurrentRate] = useState(1.0);

    const currentRateRef = db.ref("config/current_rate");

    useEffect(() => {
        currentRateRef.on("value", (snapshot) => {
            const data = snapshot.val();
            setServerCurrentRate(data);
        });
    }, [serverCurrentRate]);

    function writeUserData(userId, name, email, imageUrl) {
        firebase.database().ref("config").set({
            username: name,
            email: email,
            profile_picture: imageUrl,
        });
    }

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
        <form onSubmit={handleSubmit} className="rateForm">
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
    );
};

export default CurrentRateForm;
