import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTelegram, faInstagram, faWhatsapp, faYoutube, faXTwitter} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
<footer className="text-white text-center text-lg-start" style={{ backgroundColor: "#383741" }}>
    <div className="container p-4">
        <div className="row">
        <div className="col-lg-5 col-md-6 mb-4 mb-md-0"> {/* Adjusted column widths */}
                <h5 className="text-uppercase">Quick Links</h5>
                <ul className="list-unstyled mb-0">
                    <li>
                        <Link to="/" className="text-white">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-white">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-white">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/services" className="text-white">Services</Link>
                    </li>
                </ul>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0 ml-lg-3">
                <h5 className="text-uppercase">Social Media</h5>
                <ul className="list-unstyled d-flex justify-content-start mb-0">
                    <li className="me-3"> {/* Added class me-3 to adjust the margin */}
                        <a href="#!" className="text-white">
                            <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '2rem' }} />
                        </a>
                    </li>
                    <li className="me-3"> {/* Added class me-3 to adjust the margin */}
                        <a href="#!" className="text-white">
                            <FontAwesomeIcon icon={faTelegram} style={{ fontSize: '2rem' }} />
                        </a>
                    </li>
                    <li> {/* Removed the class me-3 */}
                        <a href="#!" className="text-white">
                            <FontAwesomeIcon icon={faYoutube} style={{ fontSize: '2rem' }} />
                        </a>
                    </li>
                </ul>
                <ul className="list-unstyled d-flex justify-content-start mt-3">
                    <li className="me-3"> {/* Added class me-3 to adjust the margin */}
                        <a href="#!" className="text-white">
                            <FontAwesomeIcon icon={faXTwitter} style={{ fontSize: '2rem' }} />
                        </a>
                    </li>
                    <li className="me-3"> {/* Added class me-3 to adjust the margin */}
                        <a href="#!" className="text-white">
                            <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '2rem' }} />
                        </a>
                    </li>
                    <li> {/* Removed the class me-3 */}
                        <a href="#!" className="text-white">
                            <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '2rem' }} />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 ml-lg-3">
                <h5 className="text-uppercase">Contact Details</h5>
                <ul className="list-unstyled mb-0">
                    <li>Malabe, Sri Lanka</li>
                    <li>Email: rio_uml@gmail.com</li>
                    <li>Phone: 025-2264256</li>
                </ul>
            </div>

        </div>
    </div>
    <div className="text-center p-3">
        © {new Date().getFullYear()} RIO Team, All Rights Reserved
    </div>
</footer>

    )
}

export default Footer
