import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import logo from "../images/logo.png";
import robot from "../images/robot-arm.png";

export default function Home() {
    const { currentUser } = useAuth();

    return (
        <div className="home">
            <div className="logo-wrapper">
                <img src={logo} />
            </div>
            <div className="robot-wrapper">
                <img src={robot} />
            </div>
            <div className="title-wrapper">
                <span>PICASSOBOT3000</span>
            </div>
            <div className="auth-wrapper">
                {currentUser ? (
                    <Link className="login-link" to="/dashboard">
                        DASHBOARD
                    </Link>
                ) : (
                    <Link className="login-link" to="/login">
                        LOGIN
                    </Link>
                )}

                <Link className="login-link" to="/signup">
                    SIGNUP
                </Link>
            </div>
        </div>
    );
}
