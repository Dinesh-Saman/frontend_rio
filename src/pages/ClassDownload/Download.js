import React from "react";
import { useState, useEffect, useContext } from "react";
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
   
  
            <div className="card bg-primary text-white d-flex justify-content-between" style={{backgroundImage: `url('https://plus.unsplash.com/premium_photo-1675802520884-45ad9a50c2c9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGV4dHVyZXxlbnwwfHwwfHx8MA%3D%3D')`}}>


                <div className="card-body">
                <h2 className="mb-6 mt-12 mb-4 text-black">Final Output of Your Diagram</h2>
                    <div className="diagram-container overflow-auto border border-dark border-2 rounded-3">
                        <img src={diagramUrl} alt="generated diagram" className="p-4" />
                    </div>
                    <div className="d-flex justify-content-around mt-4">
                    <Link to="/userRequirment">
                        <button type="button" className="btn btn-secondary custom-btn">
                            <i class="fa-solid fa-pen-to-square"></i> Generate Another Diagram
                        </button>
                    </Link>    
                    <button type="button" className="btn btn-danger custom-btn" onClick={handleDownload}>
                        <i class="fa-regular fa-circle-down"></i> Download
                    </button>

            </div>
                </div>

            </div>
      
    );
};

export default Download;
