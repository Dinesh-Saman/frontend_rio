import React from "react";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountBox from "../accountBox/AccountBox";
import Logo from "../../../../src/images/logo1.png"

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState();
    const [isAccountBoxOpen, setIsAccountBoxOpen] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData) {
            setUserData(userData);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="nav-bar">
            <div className="left">
                <Link to="/" className="nav_items">
                    <img src={Logo} className="logo"></img>
                </Link>
            </div>
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" class="hamburger">
                &#9776;
            </label>
            <div className="right">
                <div className="about">
                    <Link to={"/"} className="nav_items">
                        Home
                    </Link>
                </div>
                <div className="generate">
                    {/* if not logged ask to login first  */}
                    <Link to={"/userStory"} className="nav_items">
                        About Us
                    </Link>
                </div>
                <div className="generate">
                    {/* if not logged ask to login first  */}
                    <Link to={"/userRequirment"} className="nav_items">
                        Our Services
                    </Link>
                </div>
                <div className="generate">
                    {/* if not logged ask to login first  */}
                    <Link to={"/classDiagram"} className="nav_items">
                        Contact Us
                    </Link>
                </div>

        
            </div>
        </div>
    );
}

export default Navbar;
