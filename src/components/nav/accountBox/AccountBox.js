import React from "react";
import "./AccountBox.css";
import { Link } from "react-router-dom";

const AccountBox = (props) => {
    const handleLogout = () => {
        sessionStorage.removeItem("userData");
        props.setLogin(false);
    };

    return (
        <div className="profile-options">
            <ul>
                <li onClick={handleLogout}>
                    <Link to="/sign-in" className="router-link">
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AccountBox;
