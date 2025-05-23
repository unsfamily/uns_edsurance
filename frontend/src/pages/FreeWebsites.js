import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FreeWebsites = () => {
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
      <Footer />
    </>
  );
};

export default FreeWebsites;
