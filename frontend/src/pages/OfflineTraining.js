import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OfflineTrainingImg from "../assets/images/offlinetraining.jpeg";

const OfflineTraining = () => {
  const { isAuthenticated, currentUser, hasSubscription } = useAuth();
  const navigate = useNavigate();
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/subscription");
    }
  }, [isAuthenticated, navigate]);
  const handleClickHere = () => {
    if (isAuthenticated) {
      // If user is logged in, navigate to the corresponding resource
      navigate("/subscription-form");
    }
  };
  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container-fluid py-5">
          <div className="container py-5">
            <h2 className="text-center text-warning mb-4">
              🏫 Quaterly offline workshops
            </h2>
            {/* <p className="text-center mb-5">
              Meet fellow students and educators face-to-face in your area.
            </p> */}
            <div className="col-md-6 text-center training-img">
              <img src={OfflineTrainingImg} alt="Online Training" />
            </div>

            <ul className="list-group shadow mt-4">
              <li className="list-group-item">
                <strong>May 29, 2025:</strong> STEM Workshop – Lincoln High
                School, NY
              </li>
              <li className="list-group-item">
                <strong>June 3, 2025:</strong> Project Showcase – Community
                Learning Center, LA
              </li>
            </ul>
          </div>
        </div>

        {isAuthenticated && !hasSubscription && (
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleClickHere();
              }}
            >
              Enroll in UNS for this facility
            </button>
          </div>

          //  : (
          //   <a
          //     href="https://docs.google.com/forms/d/e/1FAIpQLScDm7aodpA71cr0mAqn7uf844lpWLvsu3vkOxSNd7q7YDEszA/viewform?usp=dialog"
          //     target="_blank"
          //     rel="noopener noreferrer"
          //   >
          //     Join Now
          //   </a>
        )}
      </div>

      <Footer />
    </>
  );
};

export default OfflineTraining;
