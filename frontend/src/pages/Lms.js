import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Lms = () => {
  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h2 className="text-center text-primary mb-4">
            💻 LMS - Learning Management System
          </h2>

          <div className="fs-20 text-center lms-txt col-md-5">
            <p>
              <i className="fas fa-user-graduate"></i> Student Assessment
              Platform{" "}
            </p>
            <p>
              <i className="fas fa-tools"></i> Comprehensive Assessment Tools
            </p>
            <p>
              <i className="fas fa-chart-line"></i> Real-Time Performance
              Tracking
            </p>
            <p>
              <i className="fas fa-comment-dots"></i> Personalized Feedback
            </p>
            <p>
              <i className="fas fa-cogs"></i> Customizable Tests
            </p>
            <p>
              <i className="fas fa-upload"></i> Assignment & Submission System
            </p>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-primary">
              Enroll in UNS for this facility
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Lms;
