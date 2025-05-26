import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OfflineTraining = () => {
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
      <div className="container-fluid py-5">
        <div className="container-fluid py-5">
          <div className="container py-5">
            <h2 className="text-center text-warning mb-4">
              🏫 Quaterly offline workshops
            </h2>
            <p className="text-center mb-5">
              Meet fellow students and educators face-to-face in your area.
            </p>

            <ul className="list-group shadow">
              <li className="list-group-item">
                <strong>May 28, 2025:</strong> STEM Workshop – Lincoln High
                School, NY
              </li>
              <li className="list-group-item">
                <strong>June 3, 2025:</strong> Project Showcase – Community
                Learning Center, LA
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-primary">
            Enroll in UNS for this facility
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OfflineTraining;
