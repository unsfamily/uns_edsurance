import React from "react";
import { Link, useNavigate } from "react-router-dom";
import edsuranceLogo from "../assets/images/edsurance.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
        <Link to="/" className="navbar-brand ml-lg-3">
          <h1 className="m-0 text-uppercase text-primary">
            <img width="150" src={edsuranceLogo} alt="Edsurance Logo" />
          </h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between px-lg-3"
          id="navbarCollapse"
        >
          <div className="navbar-nav mx-auto py-0">
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                What We Offer
              </a>
              <div className="dropdown-menu m-0">
                <a href="#offering" className="dropdown-item">
                  Offering
                </a>
                <a href="#nasa" className="dropdown-item">
                  NASA Scientist
                </a>
                <a href="#assessment" className="dropdown-item">
                  Student Assessment
                </a>
              </div>
            </div>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
          </div>
          
          {isAuthenticated ? (
            <div className="d-none d-lg-flex align-items-center">
              <span className="mr-3">Welcome, {currentUser?.name || 'User'}</span>
              <button 
                onClick={handleLogout}
                className="btn btn-secondary py-2 px-4"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-primary mr-2 py-2 px-4 d-none d-lg-block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary py-2 px-4 d-none d-lg-block"
              >
                Join Us
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
