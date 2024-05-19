import React, { useRef, useState } from 'react'
import axios from 'axios';

const UploadDiagram = () => {

    const fileInputField = useRef(null);

    const [code, setCode] = useState(null);
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(null);

    const handleFile = async (event) => {
        const file = event.target.files[0];
        setPreview(URL.createObjectURL(file))

        const formData = new FormData();

        formData.append("file", file);

        await axios.post("http://ctse-app-alb-1-1240111947.us-east-1.elb.amazonaws.com/upload", formData)
            .then(res => {
                setLoading(true)
                // console.log(res)
                setCode(res.data.code)

                setTimeout(() => {
                    setLoading(false)
                }, 5000)
            })

            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }

    return (
        <div className="main_container">

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
                            <a className='btn btn-outline-secondary mt-4' href={code && code} >Predict the design pattern</a>
                        </span>
                    }

                </div>
            </div>

        </div>
    )
}

export default UploadDiagram