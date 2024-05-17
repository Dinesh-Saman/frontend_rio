import React from "react";
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav/navbar/Navbar";
import "./UserStory.css";
import axios from "axios";
import DiagramMarkdownContext from "../../context/DiagramMarkdownContext";
import DiagramDictionaryContext from "../../context/DiagramDictionaryContext";
import Loading from "../../components/alert/Loading";
import AlertMsg from "../../components/alert/AlertMsg";
import Footer from "../../components/footer/Footer";

const UserStory= () => {
    const [formData, setFormData] = useState({});
    const [text, setText] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();
    const fileInputField = useRef(null);
    const { setResponseData } = useContext(DiagramMarkdownContext); // Context
    const { setDiagramDictionary } = useContext(DiagramDictionaryContext); // Context

    // add textarea value to state
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // add file data
    const handleFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", (event) => {
            const text = event.target.result;
            setText(text);

            setFormData({
                ...formData,
                ["userinput-textarea"]: event.target.result,
            });
        });
        reader.readAsText(file);
    };

    // handle generate diagram btn click
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData["userinput-textarea"]) {
            sendDataToServer(formData);
        } else {
            setErrorMsg("No senarios entered..");
            setShowAlert(true);
        }
    };

    // sending data to server
    function sendDataToServer(data) {
        setShowLoading(true);
        const data1 = new FormData();
        data1.append("userinput-textarea", data["userinput-textarea"]);
        console.log(data1);
        const url = `http://localhost:8081/generateDiagram.php`;
        axios
            .post(url, data1)
            .then((response) => {
                console.log("res " + response.data);
                setResponseData(response.data.link);
                setDiagramDictionary(JSON.parse(response.data.dictionary));
                setShowLoading(false);
                navigate("/download");
            })
            .catch((error) => {
                console.log(error);
                setShowLoading(false);
                setErrorMsg("Paragraph not clear..Pls try a differnt description..");
                setShowAlert(true);
            });
    }

    return (
        <div>
            <Navbar />
            {showAlert && <AlertMsg type="warning" text={errorMsg} setShowAlert={setShowAlert} />}
            <div className="main_container">
                <div className="userInput-container">
                    <h2 className="mb-4">Generate Your User Story</h2>

                    <div className="form-outline">
                        <textarea
                            name="userinput-textarea"
                            defaultValue={text}
                            onChange={(event) => handleChange(event)}
                            className="form-control border border-5 rounded"
                            id="textarea"
                            rows="10"
                            placeholder="Enter your senario.."
                        ></textarea>
                    </div>
                    {showLoading && <Loading msg="Generating Diagram" />}

                    <div className="d-flex justify-content-around mt-4">
                        <input type="file" accept=".txt" className="d-none" ref={fileInputField} onChange={(event) => handleFile(event)} />
                        <button type="button" className="btn btn-success" onClick={() => fileInputField.current.click()}>
                            <i className="fa fa-file-arrow-up ms-1"></i> import file
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleSubmit}>
                            Generate User Story
                            <i className="fas fa-long-arrow-alt-right ms-1"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <h3>For Better Results:</h3>
                    <p>Try to reduce pasive voice sentences.</p>
                    <p>Try to write in simple sentences.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserStory;
