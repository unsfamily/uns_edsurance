import React from "react";
import "../assets/scss/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClickHere = (resource) => {
    if (isAuthenticated) {
      // If user is logged in, navigate to the corresponding resource
      switch(resource) {
        case 'ebook':
          navigate('/ebook');
          break;
        default:
          navigate('/ebook');
      }
    } else {
      // If user is not logged in, navigate to subscription page
      navigate('/subscription');
    }
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div
        className="jumbotron jumbotron-fluid position-relative overlay-bottom"
        style={{ marginBottom: "90px" }}
      >
        <div className="container text-center my-5 py-5">
          <h1 className="text-white display-1 mb-5">Edsurance</h1>
          <div className="text-white fs-20">
            A comprehensive solution to modern educational challenges by
            involving{" "}
            <span className="font-weight-bold text-dark">
              parents, psychologists, therapists, career experts, literary
              professionals
            </span>{" "}
            during children's formative years.
          </div>
          <div className="text-white fs-20">
            It emphasizes holistic development, instills moral values through
            practice, restores habits impacted by technology, supports children
            in difficult times, nurtures talent, and prepares them for
            independence.
          </div>
        </div>
      </div>

      {/* Offerings Section */}
      <div className="container-fluid bg-image" style={{ margin: "30px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 my-4 pb-lg-5">
              <div
                className="section-title position-relative mb-4"
                id="offering"
              >
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  Edsurance offering schools
                </h6>
              </div>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-primary mr-4">
                  <i className="fa fa-2x fa-book-open text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Free E-Books</h4>
                  <p>
                    Edsurance offers access to a vast digital library with lakhs
                    of eBooks, covering diverse subjects and academic levels.{" "}
                    <a href="#" onClick={(e) => {e.preventDefault(); handleClickHere('ebook')}}>Click Here</a>
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-secondary mr-4">
                  <i className="fa fa-2x fa-globe text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Free Websites</h4>
                  <p>
                    Edsurance will create a personalized website for each
                    school, showcasing their achievements and offerings at no
                    cost. <a href="#" onClick={(e) => {e.preventDefault(); handleClickHere('website')}}>Click Here</a>
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-warning mr-4">
                  <i className="fa fa-2x fa-laptop text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Online Training</h4>
                  <p className="m-0">
                    Scientist-led classes, webinars, and research-based learning
                    to enhance education and innovation.{" "}
                    <a href="#" onClick={(e) => {e.preventDefault(); handleClickHere('training')}}>Click Here</a>
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-info mr-4">
                  <i className="fa fa-2x fa-book-reader text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Offline Training</h4>
                  <p className="m-0">
                    Offline workshops every 3 months for professional
                    development. <a href="#" onClick={(e) => {e.preventDefault(); handleClickHere('offline')}}>Click Here</a>
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-success mr-4">
                  <i className="fa fa-2x fa-network-wired text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Networking</h4>
                  <p className="m-0">
                    School meetups for collaboration and knowledge sharing with
                    scientists. <a href="#" onClick={(e) => {e.preventDefault(); handleClickHere('networking')}}>Click Here</a>
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="btn-icon bg-secondary mr-4">
                  <i className="fa fa-2x fa-comments text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Chatbot</h4>
                  <p className="m-0">
                    AI-powered chatbot for students to clear doubts anytime.{" "}
                    <a href="#" onClick={(e) => {e.preventDefault(); handleClickHere('chatbot')}}>Click Here</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100"
                  src={require("../assets/images/feature.jpg")}
                  style={{ objectFit: "cover" }}
                  alt="Feature"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NASA Scientist Section */}
      <div className="container-fluid" style={{ margin: "30px 0" }}>
        <div className="container">
          <div className="section-title position-relative mb-4">
            <h6 className="d-inline-block mt-5 position-relative text-secondary text-uppercase pb-2">
              A Journey Through the Universe with a NASA Scientist
            </h6>
          </div>
          <div className="row">
            <div className="col-lg-5" style={{ minHeight: "400px" }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute right-radious w-100 h-100"
                  src={require("../assets/images/nasa.jpg")}
                  style={{ objectFit: "cover" }}
                  alt="NASA Scientist"
                />
              </div>
            </div>
            <div className="col-lg-7 my-1 pb-lg-5" id="nasa">
              <h4 className="mb-4">NASA Scientist</h4>
              <p>
                Join us for an inspiring session with a NASA scientist as they
                explore the wonders of space, technology, and discovery. Learn
                about Mars rovers, astronaut training, black holes, and more.
              </p>
              <p>
                This session encourages students to think like scientists and
                understand how STEM can lead to exciting careers—even at NASA.{" "}
                <a href="#" onClick={(e) => {e.preventDefault(); handleClickHere('nasa')}}>Click Here</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Assessment Platform */}
      <div className="container-fluid py-5">
        <div className="container py-5" id="assessment">
          <div className="col-lg-12">
            <div className="section-title text-center position-relative mb-4">
              <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                Student Assessment Platform
              </h6>
              <p className="fs-20 mt-2">
                Real-time tracking of student performance through quizzes,
                assignments, and analytics. AI-powered insights for personalized
                learning.
              </p>
            </div>
          </div>
          <div className="row">
            {/* Sample Assessment Cards */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div className="col-lg-4 mb-4" key={num}>
                <div className="bg-light text-center p-4 h-100">
                  <img
                    className="img-fluid mb-3"
                    src={require(`../assets/images/team-${num}.jpg`)}
                    alt={`Assessment ${num}`}
                  />
                  <h5 className="mb-3">Assessment Feature {num}</h5>
                  <p className="mb-2">
                    Details about feature {num} of the assessment platform.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              className="btn btn-primary mt-5 text-center"
              onClick={() => handleClickHere('assessment')}
            >
              Click Here
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
