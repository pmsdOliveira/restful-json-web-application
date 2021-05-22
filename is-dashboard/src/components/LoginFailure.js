import React from "react";
import { Link } from "react-router-dom";

export default function LoginFailure() {
    return (
        <Link to="/login" className="signup-fail">Task successfully failed.
        </Link>
    );
}
