import React, { useRef, useState } from 'react'
import axios from 'axios';
import Modal from '../../components/designpattern/Model';

const UploadDiagram = () => {

    const fileInputField = useRef(null);

    const [code, setCode] = useState(null);
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(null);
    const [designPatternLoading, setDesignPatternLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [patterns, setPatterns] = useState([])

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleFile = async (event) => {
        const file = event.target.files[0];
        setPreview(URL.createObjectURL(file))
        setLoading(true)

        const formData = new FormData();

        formData.append("file", file);

        await axios.post("http://ctse-app-alb-1-1240111947.us-east-1.elb.amazonaws.com/upload", formData)
            .then(res => {

                // console.log(res)
                setCode(res.data.code)

                setTimeout(() => {
                    setLoading(false)
                }, 10000)
            })

            .catch(err => {
                setLoading(false)
                console.log(err)
            })


    }


    const handleDesignPattern = async () => {

        setDesignPatternLoading(true);
        await axios.get("http://ctse-app-alb-1-1240111947.us-east-1.elb.amazonaws.com/predict")
            .then(res => {
                // console.log(res)
                setPatterns(res.data.patterns)
                setDesignPatternLoading(false)
            })

            .catch(err => {
                console.log(err)
                setDesignPatternLoading(false)
            })
    }

    return (
        <>
            <div className="main_container">

                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Predicted design patterns</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <table style={{
                                    width: '50%',
                                    margin: '20px auto',
                                    borderCollapse: 'collapse',
                                    fontFamily: 'Arial, sans-serif'
                                }}>
                                    <thead>
                                        <tr>
                                            <th style={{
                                                border: '1px solid black',
                                                padding: '8px',
                                                backgroundColor: '#f2f2f2',
                                                textAlign: 'left'
                                            }}>Design Pattern</th>
                                            <th style={{
                                                border: '1px solid black',
                                                padding: '8px',
                                                backgroundColor: '#f2f2f2',
                                                textAlign: 'left'
                                            }}>Accuracy</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {designPatternLoading ? <p>Loading</p> :
                                            patterns.map(pattern => {
                                                console.log(pattern)
                                                return (
                                                    <tr>
                                                        <td style={{
                                                            border: '1px solid black',
                                                            padding: '8px'
                                                        }}>{pattern.split("-")[0]}</td>
                                                        <td style={{
                                                            border: '1px solid black',
                                                            padding: '8px'
                                                        }}>{pattern.split("-")[1]}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="mb-4">Get skeleton java code and predict the design pattern</h2>

                <div className='row'>

                    <div className='col-sm-6'>
                        <img
                            className="use-case-image"
                            style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "500px" }}
                            src="https://assets-v2.lottiefiles.com/a/8b9e0836-116e-11ee-bad5-e357b16246db/gY7OYGHGU7.gif"
                        />
                    </div>
                    <div className='col-sm-6'>
                        <div className='img'>
                            <img width='400px' src={preview} />
                        </div>
                        <div className='mt-4'>
                            <input type="file" accept=".jpeg" className="d-none" ref={fileInputField} onChange={(event) => handleFile(event)} />
                            <button type="button" className="btn btn-success custom-button" onClick={() => fileInputField.current.click()}>
                                <i className="fa fa-file-arrow-up ms-1"></i> Import File
                            </button> <br></br>
                        </div>

                        {
                            loading ? <p>Loading</p> : preview && <span>
                                <a className='btn btn-outline-secondary mt-4 me-2' href={code && code} >Download the source code</a>
                                <button type="button" onClick={handleDesignPattern} class="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Predicted design patterns
                                </button>
                            </span>
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default UploadDiagram