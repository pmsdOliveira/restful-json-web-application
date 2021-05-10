import React, { useState } from "react";
import firebase from "firebase/app";

import "../styles/main.css";

const readAccelX = () => {
    firebase
        .database()
        .ref("accel_x")
        .on("value", (snapshot) => {
            const data = snapshot.val();
        });
};

const App = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDG8ln3M_AiH6XRaAgT6gNeEHM-biPlO9I",
        authDomain: "is-tp2-84cca.firebaseapp.com",
        databaseURL: "https://is-tp2-84cca-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "is-tp2-84cca",
        storageBucket: "is-tp2-84cca.appspot.com",
        messagingSenderId: "511871924939",
        appId: "1:511871924939:web:3680e3f8a75931fa70794e",
        measurementId: "G-9L852TTKZD",
    };

    firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();

    const [data, setData] = useState({});

    return (
        <div>
            <div className="circle-big"></div>
            <div className="circle-medium"></div>
            <div className="circle-small"></div>
            <div id="l-modal">
                <p>{data}</p>
            </div>
        </div>
    );
};

export default App;
