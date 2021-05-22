import React from "react";
import { Link } from "react-router-dom";

export default function SignupFailure() {
    return (
        <Link to="/login" className="signup-fail">You shall not pass!
        </Link>
    );
}