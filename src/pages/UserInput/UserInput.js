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
// sending data to server
function sendDataToServer(data) {
    setShowLoading(true);

    // Extract the first 579 characters
    const truncatedInput = data["userinput-textarea"].slice(0, 773);

    const data1 = new FormData();
    data1.append("userinput-textarea", truncatedInput); // Append the truncated input

    const url = `http://localhost:8080/generateDiagram.php`;
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
            setErrorMsg("Paragraph not clear..Please try a different description..");
            setShowAlert(true);
        });
}


    return (
        <div>
            {showAlert && <AlertMsg type="warning" text={errorMsg} setShowAlert={setShowAlert} />}
            <div className="main_container">
                <div className="userInput-container">
                    <h2 className="mb-4">Generate Your Use Case Diagram</h2>
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
                            src="https://i.pinimg.com/originals/b9/e4/96/b9e4960c1476c78043d499d975f86cdb.gif"
                            style={{ width: '500px', height: 'auto'}}
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
