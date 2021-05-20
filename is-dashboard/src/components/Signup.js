import React from "react";

export default function Signup() {
    return (
        <form className="signup">
            <div>
                <input type="text" name="mail" required className="text-input"></input>
                <span className="floating-label">E-mail</span>
            </div>
            <input type="password" name="password" placeholder="Password"></input>
            <input type="password" name="confirm" placeholder="Confirm password"></input>
            <label><input type="checkbox" name="terms"></input>Test</label>
            <input type="reset" value="Clear"></input>
            <input type="submit" value="Submit"></input>
        </form>
    );
}