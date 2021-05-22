import React from "react";
import { Link } from "react-router-dom";

export default function SignupFailure() {
    return (
        <Link to="/signup" className="signup-fail">Task successfully failed.
        </Link>
    );
}
