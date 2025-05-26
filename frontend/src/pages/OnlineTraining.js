import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OnlineTrainingImg from "../assets/images/onlinetraining.jpeg";

const OnlineTraining = () => {
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

      <div className="container-fluid ">
        <div className="container ">
          <div className="container-fluid">
            <div className="container py-5">
              <h2 className="text-center text-info mb-4">
                💻 Monthly online workshops
              </h2>
              {/* <p className="text-center mb-5">
                Join live sessions with educators and peers. Check the details
                below:
              </p> */}
              <div className="col-md-6 text-center training-img">
                <img src={OnlineTrainingImg} alt="Online Training" />
              </div>
              <table className="table table-bordered bg-white shadow mt-4">
                <thead className="table-info">
                  <tr>
                    <th>Date</th>
                    <th>Topic</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>May 28, 2025</td>
                    <td>Science Fair Planning</td>
                    <td>
                      {isAuthenticated && !hasSubscription ? (
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
                      ) : (
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLScDm7aodpA71cr0mAqn7uf844lpWLvsu3vkOxSNd7q7YDEszA/viewform?usp=dialog"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register Now
                        </a>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OnlineTraining;
