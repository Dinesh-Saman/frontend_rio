import React from "react";
import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/nav/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import "./Download.css";
import axios from "axios";
import plantUmlEncoder from "plantuml-encoder";
import DiagramMarkdownContext from "../../context/DiagramMarkdownContext";

const Download = () => {
    const { responseData } = useContext(DiagramMarkdownContext); // Context
    const [diagramUrl, setDiagramUrl] = useState("");

    // creating img from plantuml code
    const encodeDiagram = (plantUmlCode) => {
        console.log(plantUmlCode);
        const encodedCode = plantUmlEncoder.encode(plantUmlCode);
        const url = `https://www.plantuml.com/plantuml/img/${encodedCode}`;
        return url;
    };

    // run encodeDiagram on page load
    useEffect(() => {
        const encodedDiagram = encodeDiagram(responseData);
        setDiagramUrl(encodedDiagram);
    }, []);

    const handleDownload = () => {
        axios.get(diagramUrl, { responseType: "blob" }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.download = "GenUML_Diagram.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        });
    };

    return (
        <div>
            <Navbar />
            <div className="main_container">
                <div className="download-container">
                    <h2 className="mb-0">RIO UML</h2>
                    <p>Final output of your use case diagram</p>

                    <div className="diagram-container">
                        <img src={diagramUrl} alt="generated diagram" className="p-4" />
                    </div>

                    <div className="d-flex justify-content-around mt-4">
                        <button type="button" className="btn btn-danger" onClick={handleDownload}>
                            <i class="fa-regular fa-circle-down"></i> Download
                        </button>
                    </div>
                </div>
            </div>

        
        </div>
    );
};

export default Download;
