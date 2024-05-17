import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav/navbar/Navbar";
import "./UserInput.css";
import axios from "axios";
import DiagramMarkdownContext from "../../context/DiagramMarkdownContext";
import DiagramDictionaryContext from "../../context/DiagramDictionaryContext";
import Loading from "../../components/alert/Loading";
import AlertMsg from "../../components/alert/AlertMsg";
import Footer from "../../components/footer/Footer";
import useCaseImage from "../../images/usecase.avif"; // Import your image

const UserInput = () => {
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
            setErrorMsg("No scenarios entered..");
            setShowAlert(true);
        }
    };

const handleReset = () => {
    setFormData({});
    setText(""); // Clear the text area state
    // Clear the textarea element
    const textarea = document.getElementById("textarea");
    if (textarea) {
        textarea.value = "";
    }
};

    // sending data to server
    function sendDataToServer(data) {
        setShowLoading(true);
        const extractedText = data["userinput-textarea"].substring(773, 3072); // Extract text between characters 774 to 2298
        const formData = new FormData();
        formData.append("userinput-textarea", extractedText);

        const url = `http://localhost:8000/generateDiagram.php`;
        axios
            .post(url, formData)
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
                setErrorMsg("Paragraph not clear..Please try a different description..");
                setShowAlert(true);
            });
    }


    return (
        <div>
            {showAlert && <AlertMsg type="warning" text={errorMsg} setShowAlert={setShowAlert} />}
            <div className="main_container">
                <div className="userInput-container">
                    <h2 className="mb-4">Generate Your Class Diagram</h2>
                    <div className="textarea-container">
                        <textarea
                            style={{
                                backgroundColor: '#EFCEFA',
                                color:'black',
                                padding: '30px', // Add padding for spacing
                                borderRadius: '20px', // Add rounded corners
                                resize: 'vertical', // Allow vertical resizing
                                width: '100%', // Set width to fill its container
                                minHeight: '100px', // Set a minimum height
                                fontFamily: 'Arial, sans-serif', // Set font family
                                fontSize: '16px', // Set font size
                                lineHeight: '1.5', // Set line height
                            }}
                            name="userinput-textarea"
                            defaultValue={text}
                            onChange={(event) => handleChange(event)}
                            id="textarea"
                            rows="10"
                            placeholder="Input Your Scenario.."
                        />

                        <img
                            className="use-case-image"
                            src="https://assets-v2.lottiefiles.com/a/8b9e0836-116e-11ee-bad5-e357b16246db/gY7OYGHGU7.gif"
                            style={{ width: '400px', height: 'auto', marginLeft: '100px'}}
                        />
                    </div>
                    {showLoading && <Loading msg="Generating Diagram" />}
                    <div className="d-flex justify-content-around mt-4">
                        <input type="file" accept=".txt" className="d-none" ref={fileInputField} onChange={(event) => handleFile(event)} />
                        <button type="button" className="btn btn-success custom-button" onClick={() => fileInputField.current.click()}>
                            <i className="fa fa-file-arrow-up ms-1"></i> Import File
                        </button>
                        <button type="button" className="btn btn-secondary custom-button" onClick={handleReset}>
                            Reset Scenario
                        </button>
                        <button type="button" className="btn btn-danger custom-button" onClick={handleSubmit}>
                            Generate Diagram <i className="fas fa-arrow-up ms-1"></i>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserInput;
