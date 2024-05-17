import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/nav/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Home.css";
import HomeScreen1 from "../../images/home1.png";
import HomeScreen2 from "../../images/home2.png";
import HomeScreen3 from "../../images/home3.png";
import HomeScreen4 from "../../images/home4.png";
import Image1 from "../../images/image1.png";
import Image2 from "../../images/image2.png";
import Image3 from "../../images/image3.png";
import Image4 from "../../images/image4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  // Define your images
  const images = [HomeScreen1, HomeScreen2, HomeScreen3, HomeScreen4];
  
  // State to manage current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to move to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to move to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    // Set up a timer to advance to the next image every 5 seconds
    const intervalId = setInterval(nextImage, 5000);

    // Clean up the timer when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="image-container">
        <img src={images[currentImageIndex]} className="home" alt="Home" />
        <div className="circle-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={index === currentImageIndex ? "active-circle" : "inactive-circle"}
              onClick={() => setCurrentImageIndex(index)}
            ></div>
          ))}
        </div>
        <button className="button-prev" onClick={prevImage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="button-next" onClick={nextImage}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button className="button-inside-image">
          <Link to="/sign-in">Get Started</Link>
        </button>
      </div>
      <div className="description card-container">
  <div className="card" style={{ pointerEvents: 'none', backgroundColor:"cyan" }}>
  <h2 className="prompt-text">About RIO UML</h2>
    <p>
      RIO UML is a comprehensive tool designed for software developers and designers to streamline the process of creating UML diagrams and generating code snippets. It offers various features such as automatic generation of user stories, class diagrams, use case diagrams, and code snippets, helping teams to visualize their software architecture and accelerate the development process.
    </p>
    <div className="row justify-content-center" style={{}}>
  <div className="col-lg-3 col-md-4 mb-4"  style={{ width: '20%' }}>
    <div className="card" style={{ width: '230px', height: '230px', marginRight:'20px'}}>
    <img src="https://cdn.dribbble.com/users/571755/screenshots/15241780/media/139ee3b39673f23dc3694490e50f6257.jpg?resize=400x300&vertical=center" className="card-img-top" alt="Card Image" />
      <div className="card-body">
        <h5 className="card-title">Accurate</h5>
      </div>
    </div>
  </div>
  <div className="col-lg-3 col-md-4 mb-4"  style={{ width: '20%' }}>
    <div className="card" style={{ width: '230px', height: '230px', marginRight:'20px'}}>
    <img src="https://img.freepik.com/premium-vector/man-red-shirt-is-flying-rocket_220346-8156.jpg" className="card-img-top" alt="Card Image" />
      <div className="card-body">
        <h5 className="card-title">Fast</h5>
      </div>
    </div>
  </div>
  <div className="col-lg-3 col-md-4 mb-4"  style={{ width: '20%' }}>
    <div className="card" style={{ width: '230px', height: '230px', marginRight:'20px'}}>
      <div className="card-body">
      <img src="https://unblast.com/wp-content/uploads/2020/03/Illustrator-Vector-Illustration-1.jpg" className="card-img-top" alt="Card Image" />
        <h5 className="card-title">Download</h5>
      </div>
    </div>
  </div>
  <div className="col-lg-3 col-md-4 mb-4"  style={{ width: '20%' }}>
    <div className="card" style={{ width: '230px', height: '230px', marginRight:'20px'}}>
      <div className="card-body">
      <img src="https://img.freepik.com/free-vector/male-programmer-working-computer-office-wall-with-hanging-reminder-stickers-developer-creating-new-software-interface-coding-programming-system-administrator-designer-character_575670-1159.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706918400&semt=sph" className="card-img-top" alt="Card Image" />
        <h5 className="card-title">Edit</h5>
      </div>
    </div>
  </div>
  <div className="col-lg-3 col-md-4 mb-4"  style={{ width: '20%' }}>
    <div className="card" style={{ width: '230px', height: '230px', marginRight:'20px'}}>
      <div className="card-body">
      <img src="https://img.freepik.com/free-vector/male-programmer-working-computer-office-wall-with-hanging-reminder-stickers-developer-creating-new-software-interface-coding-programming-system-administrator-designer-character_575670-1159.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706918400&semt=sph" className="card-img-top" alt="Card Image" />
        <h5 className="card-title">Easy</h5>
      </div>
    </div>
  </div>
</div>


  </div>
</div>

      <h2 className="prompt-text">Choose what you want to generate</h2>
      <div className="card-container">
        {/* Card 1 */}
        <div className="card">
          <Link to="./userRequirment" style={{textDecoration:'none'}}>
          <img src={Image4} alt="Card 1" />
          <h3>RIO User Story</h3>
          <p>Automatically generate user stories for your projects with RIO User Story.</p>  
          </Link>
        </div>
        {/* Card 2 */}
        <div className="card">
        <Link to="./classDiagram" style={{textDecoration:'none'}}>
          <img src={Image2} alt="Card 2" />
          <h3>RIO Class Diagram</h3>
          <p>Generate class diagrams effortlessly using RIO Class Diagram.</p>
          </Link>
        </div>
        {/* Card 3 */}
        <div className="card">
        <Link to="./userRequirment" style={{textDecoration:'none'}}>
          <img src={Image1} alt="Card 3" />
          <h3>RIO Use Case Diagram</h3>
          <p>Automatically generate use case diagrams with RIO Use Case Diagram.</p>
          </Link>
        </div>
        {/* Card 4 */}
        <div className="card">
        <Link to="./userRequirment" style={{textDecoration:'none'}}>
          <img src={Image3} alt="Card 4" />
          <h3>RIO Code Generator</h3>
          <p>Generate code snippets quickly and efficiently using RIO Code Generator.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;