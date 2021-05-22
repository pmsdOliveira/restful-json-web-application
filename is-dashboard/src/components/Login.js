import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import logo from "../images/logo.png";

export default function Login() {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");

    const [isMailActive, setMailActive] = useState(false);
    const [isPassActive, setPassActive] = useState(false);

    const [isLoading, setLoading] = useState(false);
    const { login } = useAuth();
    const history = useHistory();

    const reset = () => {
        setMail("");
        setMailActive(false);
        setPass("");
        setPassActive(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let regex =
            /^(?=.{8,100}$)(([a-zA-Z0-9_.-]+(\.[a-zA-Z0-9_.-]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(mail)) {
            alert("Please insert a valid email (8 to 100 alphanumeric, _, ., - or @ characters).");
            return;
        }

        regex = /^(?=.*[a-zA-Z0-9]).{8,}$/;
        if (!regex.test(pass)) {
            alert("Please insert a valid password (8 to 50 characters).");
            return;
        }

        try {
            await login(mail, pass);
            history.push("/dashboard");
        } catch {
            history.push("/login-failure");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup">
            <div className="signup-logo-wrapper">
                <Link className="signup-exit-link" to="/">
                    <i className="signup-arrow"></i>
                </Link>
                <p className="signup-tag">Login</p>
                <img src={logo} />
            </div>
            <div className="signup-inputs">
                <div className="signup-text" onClick={() => setMailActive(true)}>
                    <input
                        type="text"
                        name="mail"
                        required
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    ></input>
                    <label className={isMailActive ? "signup-label-active" : ""}>E-mail</label>
                </div>
                <div className="signup-text" onClick={() => setPassActive(true)}>
                    <input
                        type="password"
                        name="password"
                        required
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    ></input>
                    <label className={isPassActive ? "signup-label-active" : ""}>Password</label>
                </div>
            </div>
            <Link to="/signup" className="signup-login">
                <span>Don't have an account? Sign up now!</span>
            </Link>
            <div className="signup-accept-terms">
                <input type="checkbox" name="terms" required></input>
                <label>I agree to share all my personal data with this company</label>
            </div>

            <div className="signup-buttons">
                <input type="reset" value="Clear" onClick={reset}></input>
                <input type="submit" value="Submit"></input>
            </div>
        </form>
    );
}
