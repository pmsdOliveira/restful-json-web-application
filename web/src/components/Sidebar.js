import logo from "../images/logo.png";
import login from "../images/login.png";

import "../styles/css/sidebar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={logo} alt="logo" className="logo"></img>
            <img src={login} alt="login" className="login"></img>
        </div>
    );
};

export default Navbar;
