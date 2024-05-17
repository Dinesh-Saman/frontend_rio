import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import Navbar from "../../components/nav/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Edit_items from "../../components/edit_items/Edit_items";
import { Link } from "react-router-dom";
import plantUmlEncoder from "plantuml-encoder";
import axios from "axios";
import "./Edit.css";
import AlertMsg from "../../components/alert/AlertMsg";
import DiagramMarkdownContext from "../../context/DiagramMarkdownContext";
import DiagramDictionaryContext from "../../context/DiagramDictionaryContext";

const Edit = () => {
    const { responseData } = useContext(DiagramMarkdownContext); // Context
    const { setResponseData } = useContext(DiagramMarkdownContext); // Context
    const { diagramDictionary } = useContext(DiagramDictionaryContext); // Context
    const [diagramUrl, setDiagramUrl] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const childRef = useRef();

    // creating img from plantuml code
    const encodeDiagram = (plantUmlCode) => {
        const encodedCode = plantUmlEncoder.encode(plantUmlCode);
        const url = `http://www.plantuml.com/plantuml/img/${encodedCode}`;
        return url;
    };

    // run encodeDiagram fun onchange responseData
    useEffect(() => {
        const encodedDiagram = encodeDiagram(responseData);
        setDiagramUrl(encodedDiagram);
    }, [responseData]);

    // convert dictionary back to edit-supported dictionary
    const converEditObj = (dictionary) => {
        const dataArray = [];
        for (const actor in dictionary) {
            if (Object.hasOwnProperty.call(dictionary, actor)) {
                dataArray.push({ actor: actor, usecases: dictionary[actor] });
            }
        }
        console.log(dataArray)
        return dataArray;
    };

    // onclick view btn
    const handleView = () => {
        const data = new FormData();
        data.append("dictionary", JSON.stringify(diagramDictionary));
        const url = 'http://localhost:8080/editDiagram.php';
        console.log("diagramDictionary:", diagramDictionary);
        axios
            .post(url, data)
            .then((response) => {
                setResponseData(response.data.code);
            })
            .catch((error) => {
                console.log(error);
                setShowAlert(true);
            });
    };

    // child refernces
    const handleAddActor = () => {
        childRef.current.addActor();
    };
    const handleAddUC = () => {
        childRef.current.addUsecase();
    };

    return (
        <div>
            {showAlert && <AlertMsg type="warning" text="Error occured.. pls try again.." setShowAlert={setShowAlert} />}
            <div className="main_container">
                <h2>Edit your diagram</h2>
                <div className="box-container d-flex justify-content-center border border-5 rounded p-3">
                    {/* options panel */}
                    <div className="options">
                        {/* ADD btns */}
                        <div className="d-flex justify-content-around">
                            <button
                                type="button"
                                className="btn btn-primary px-4"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Add New Actor"
                                onClick={handleAddActor}
                            >
                                <i className="fa-solid fa-person"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary px-4"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Add New Usecase"
                                onClick={handleAddUC}
                            >
                                <i className="fa-regular fa-message"></i>
                            </button>
                        </div>

                        {/* text inputs */}
                        <Edit_items data={converEditObj(diagramDictionary)} ref={childRef} />

                        {/* View/Save btns */}
                        <div className="d-flex justify-content-around">
                            <button
                                type="button"
                                className="btn btn-primary px-4"
                                style={{ backgroundColor: "#002B5B", borderColor: "#002B5B" }}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="View Updated Diagram"
                                onClick={handleView}
                            >
                                <i className="fa-sharp fa-regular fa-eye"></i> View
                            </button>
                            <Link to="/download">
                                <button
                                    type="button"
                                    className="btn btn-primary px-4"
                                    style={{ backgroundColor: "#002B5B", borderColor: "#002B5B" }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Go to download page"
                                >
                                    <i className="fa-solid fa-arrow-right-to-bracket"></i> Save
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* diagram img */}
                    <div className="diagram-container">
                        <img src={diagramUrl} alt="generated diagram" className="p-0" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
