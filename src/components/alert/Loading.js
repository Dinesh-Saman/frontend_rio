import React from "react";

const Loading = (props) => {
    return (
        <div className="d-flex align-items-center justify-content-center gap-4 my-2">
            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            <strong className="mr-2">{props.msg}...</strong>
        </div>
    );
};

export default Loading;