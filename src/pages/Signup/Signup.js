import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/nav/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Signup.css";
import axios from "axios";
import AlertMsg from "../../components/alert/AlertMsg";
import Loading from "../../components/alert/Loading";

const Signup = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const [showLoading, setShowLoading] = useState(false);

    const isFormValid = (data) => {
        // check is empty
        for (const value of data.values()) {
            if (value.trim().length == 0) {
                setErrorMsg("Pls Fill out all the fileds");
                return false;
            }
        }

        // check password condition
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        if (!strongRegex.test(data.get("pass"))) {
            setErrorMsg("Password should be 8 charactors long & should've at least 1 Uppercase, Lowercase and number");
            return false;
        }

        // check two passwords match
        if (data.get("pass") != data.get("confirmPass")) {
            setErrorMsg("Password and Confirm Password don't match");
            return false;
        }

        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // get the form data
        const data = new FormData(event.target);
        // check validation
        if (isFormValid(data)) {
            setShowAlert(false);
            sendData(data);
        } else {
            setShowAlert(true);
        }
    };

    const sendData = (data) => {
        setShowLoading(true);
        const url = `${process.env.REACT_APP_API}/Login_Register/register.php`;
        axios
            .post(url, data)
            .then((response) => {
                console.log(response.data);
                setShowLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setShowLoading(false);
                setErrorMsg("error occured in registration.. Pls try again..");
                setShowAlert(true);
            });
    };

    return (
        <div>
            <Navbar />
            {showAlert && <AlertMsg type="warning" text={errorMsg} setShowAlert={setShowAlert} />}
            {showLoading && <Loading msg="Creating Account" />}
            <form onSubmit={handleSubmit} className="register-form py-3 px-5 rounded">
                <div className="mb-4">
                    <h2>GenUML</h2>
                    <p>Create an account</p>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="fname">
                            First Name
                        </label>
                        <input type={"text"} id="fname" name="fname" className="form-control border border-4 rounded" />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="lname">
                            Last Name
                        </label>
                        <input type={"text"} id="lname" name="lname" className="form-control border border-4 rounded" />
                    </div>
                </div>
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="userName">
                        User Name
                    </label>
                    <input type={"text"} id="userName" name="userName" className="form-control border border-4 rounded" />
                </div>
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input type={"email"} id="email" name="email" className="form-control border border-4 rounded" />
                </div>

                {/* Password fileds */}
                <div className="d-flex justify-content-between">
                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="pass">
                            Password
                        </label>
                        <input type={"password"} id="pass" name="pass" className="form-control border border-4 rounded" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="confirmPass">
                            Confirm Password
                        </label>
                        <input type={"password"} id="confirmPass" name="confirmPass" className="form-control border border-4 rounded" />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4 px-5">
                    Sign up
                </button>
                {/* Register buttons */}
                <div className="text-center">
                    <p>
                        Already have an account?
                        <Link to="/sign-in">Login</Link>
                    </p>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                    </div>

                    <a className="btn btn-primary btn-lg btn-block mb-2" style={{ backgroundColor: "#3b5998" }} href="#!" role="button">
                        <i className="fab fa-facebook-f me-2" />
                        Continue with Facebook
                    </a>
                    <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#55acee" }} href="#!" role="button">
                        <i className="fab fa-google me-2"></i>Continue with Google
                    </a>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Signup;
