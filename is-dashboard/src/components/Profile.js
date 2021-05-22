import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import logo from "../images/logo.png";
import profile from "../images/profile.png";

import "../styles/main.css";

export default function Profile() {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await logout();
            history.push("/");
        } catch {}
    };

    if (currentUser) {
        return (
            <div className="profile">
                <div className="profile-logo-wrapper">
                    <img src={logo} />
                </div>
                <h2>Profile</h2>
                <div className="profile-image-wrapper">
                    <img src={profile} />
                </div>
                <p>{currentUser && currentUser.email}</p>
                <button className="profile-logout" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        );
    } else {
        history.push("/forbidden");
        return <div></div>;
    }
}
