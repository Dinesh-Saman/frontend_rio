import React from "react";
import "./AlertMsg.css";

const AlertMsg = (props) => {
    const closeAlert = () => {
        props.setShowAlert(false);
    };
    return (
        <div className={`alert alert-${props.type}  fade show alertBox`} role="alert">
            <strong>{props.type} </strong>
            {props.text}
            <button type="button" onClick={closeAlert} className="closeBtn border border-primary px-1 py-0">
                &times;
            </button>
        </div>
    );
};

export default AlertMsg;
