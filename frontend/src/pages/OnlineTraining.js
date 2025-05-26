import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
const OnlineTraining = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/subscription");
    }
  }, [isAuthenticated, navigate]);

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
              <p className="text-center mb-5">
                Join live sessions with educators and peers. Check the details
                below:
              </p>

              <table className="table table-bordered bg-white shadow">
                <thead className="table-info">
                  <tr>
                    <th>Date</th>
                    <th>Topic</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>May 25, 2025</td>
                    <td>Science Fair Planning</td>
                    <td>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLScDm7aodpA71cr0mAqn7uf844lpWLvsu3vkOxSNd7q7YDEszA/viewform?usp=dialog">
                        Join Now
                      </a>
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
