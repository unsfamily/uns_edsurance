import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Networking = () => {
  const { isAuthenticated } = useAuth();
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
        <div className="container ">
          <h2 className="text-center text-info mb-4">🌐 Networking Events</h2>
          <h5>✅ Industry Insights:</h5>
          <p>
            Gain firsthand knowledge from leading experts across various
            sectors, including technology, education, research, and
            entrepreneurship.
          </p>

          <h5>✅ Collaboration Opportunities:</h5>
          <p>
            Form partnerships for joint projects, internships, research
            collaborations, and innovation challenges.
          </p>

          <h5>✅ Mentorship Connections:</h5>
          <p>
            Access guidance from experienced mentors who can support academic,
            professional, and personal growth.
          </p>

          <h5>✅ Career Guidance:</h5>
          <p>
            Learn about different career paths, required skills, and real-world
            experiences through interactive sessions and panel discussions.
          </p>

          <h5>✅ Access to Exclusive Events:</h5>
          <p>
            Receive invitations to conferences, workshops, and special industry
            sessions not available to the general public.
          </p>

          <h5>✅ Build a Personal Brand:</h5>
          <p>
            Improve networking skills, practice pitching ideas, and establish a
            presence in your chosen field.
          </p>

          <h5>✅ Global Networking:</h5>
          <p>
            Connect with professionals and peers from different countries,
            promoting cultural exchange and broadening perspectives.
          </p>

          <h5>✅ Future Opportunities:</h5>
          <p>
            Networking today opens doors for future internships, scholarships,
            collaborations, and career prospects.
          </p>

          <h5>✅ Alumni & Peer Learning:</h5>
          <p>
            Engage with alumni networks and fellow students to share
            experiences, challenges, and opportunities.
          </p>

          <h5>✅ Exposure to Emerging Trends:</h5>
          <p>
            Stay updated on the latest developments in AI, blockchain, digital
            education, sustainability, and more.
          </p>
        </div>

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
      </div>
      <Footer />
    </>
  );
};

export default Networking;
