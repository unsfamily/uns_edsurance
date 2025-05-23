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

      <div class="container-fluid py-5">
        <div class="container py-5">
          <h2 class="text-center text-info mb-4">💻 Online Meeting Schedule</h2>
          <p class="text-center mb-5">
            Join live sessions with educators and peers. Check the details
            below:
          </p>

          <table class="table table-bordered bg-white shadow">
            <thead class="table-info">
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
                  <a href="#">Join Zoom</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OnlineTraining;
