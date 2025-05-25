import React from "react";
import { Link, useNavigate } from "react-router-dom";
import edsuranceLogo from "../assets/images/edsurance.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
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
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
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
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                What We Offer
              </span>
              <div className="dropdown-menu m-0">
                <Link to="/ebook" className="dropdown-item">
                  Digital Libraries and e-Learning Platforms
                </Link>
                <Link to="/lms" className="dropdown-item">
                  Learning Management System (LMS)
                </Link>
                <Link to="/online-training" className="dropdown-item">
                  Monthly online workshops
                </Link>
                <Link to="/offline-training" className="dropdown-item">
                  Quarterly offline workshops
                </Link>
                <Link to="/networking" className="dropdown-item">
                  Networking events
                </Link>
                <Link to="/collaborative-projects" className="dropdown-item">
                  Collaborative projects
                </Link>
                <Link to="/industry" className="dropdown-item">
                  Industry partnerships
                </Link>
                <Link to="/digital-videos" className="dropdown-item">
                  Digital Videos
                </Link>
              </div>
            </div>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>

            {isAuthenticated && (
              <Link to="/subscription-form" className="nav-item nav-link">
                Subscribe
              </Link>
            )}
          </div>

          {isAuthenticated ? (
            <div className="d-none d-lg-flex align-items-center position-relative">
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-user-circle fa-lg me-2"></i>
                  {currentUser?.firstname || currentUser?.name || "User"}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="fa fa-user me-2"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/change-password">
                      <i className="fa fa-key me-2"></i> Change Password
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="fa fa-sign-out-alt me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
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
