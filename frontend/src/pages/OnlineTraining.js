import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import OnlineTrainingImg from "../assets/images/onlinetraining.jpeg";
import OnlineTraining03 from "../assets/images/online_03.png";
import OnlineTraining04 from "../assets/images/online_04.png";
import OnlineTraining05 from "../assets/images/online_05.png";
import OnlineTraining06 from "../assets/images/online_06.png";
import OnlineTraining07 from "../assets/images/online_07.png";
import OnlineTraining08 from "../assets/images/online_08.png";

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

              <table className="table table-bordered bg-white shadow mt-4">
                <thead className="table-info">
                  <tr>
                    {/* <th>Date</th> */}
                    <th>Topic</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <td>May 28, 2025</td> */}
                    <td>Online Meeting</td>
                    <td>
                      {isAuthenticated && !hasSubscription ? (
                        <div className="text-center">
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
              {/* <p className="text-center mb-5">
                Join live sessions with educators and peers. Check the details
                below:
              </p> */}
              <div className="col-md-12 text-center training-img">
                <div className="wrap-box">
                  <div className="bod-box">
                    <img src={OnlineTraining03} alt="Online Training" />
                    <p>Science Fair Planning</p>
                    <div>
                      {isAuthenticated && !hasSubscription ? (
                        <div className="text-center">
                          {/* <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              handleClickHere();
                            }}
                          >
                            Enroll in UNS for this facility
                          </button> */}
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
                    </div>
                  </div>
                  <div className="bod-box">
                    <img src={OnlineTraining04} alt="Online Training" />
                    <p>Science Fair Planning</p>
                    <div>
                      {isAuthenticated && !hasSubscription ? (
                        <div className="text-center">
                          {/* <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              handleClickHere();
                            }}
                          >
                            Enroll in UNS for this facility
                          </button> */}
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
                    </div>
                  </div>
                
                <div className="bod-box">
                    <img src={OnlineTraining05} alt="Online Training" />
                    <p>Science Fair Planning</p>
                    <div>
                      {isAuthenticated && !hasSubscription ? (
                        <div className="text-center">
                          {/* <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              handleClickHere();
                            }}
                          >
                            Enroll in UNS for this facility
                          </button> */}
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
                    </div>
                  </div>
                  <div className="bod-box">
                    <img src={OnlineTraining06} alt="Online Training" />
                    <p>Science Fair Planning</p>
                    <div>
                      {isAuthenticated && !hasSubscription ? (
                        <div className="text-center">
                          {/* <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              handleClickHere();
                            }}
                          >
                            Enroll in UNS for this facility
                          </button> */}
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
                    </div>
                  </div>
                  <div className="bod-box">
                    <img src={OnlineTraining07} alt="Online Training" />
                    <p>Science Fair Planning</p>
                    <div>
                      {isAuthenticated && !hasSubscription ? (
                        <div className="text-center">
                          {/* <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              handleClickHere();
                            }}
                          >
                            Enroll in UNS for this facility
                          </button> */}
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
                    </div>
                  </div>
                  <div className="bod-box">
                    <img src={OnlineTraining08} alt="Online Training" />
                    <p>Science Fair Planning</p>
                    <div>
                      {isAuthenticated && !hasSubscription ? (
                        <div className="text-center">
                          {/* <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              handleClickHere();
                            }}
                          >
                            Enroll in UNS for this facility
                          </button> */}
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
                    </div>
                  </div>
              </div>
</div>
              
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OnlineTraining;
