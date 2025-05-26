import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userid: "",
    password: "",
  });

  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear the error when the user types
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    let newErrors = {};

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.userid.trim()) {
      newErrors.userid = "User ID is required";
      formIsValid = false;
    } else if (!emailRegex.test(formData.userid)) {
      newErrors.userid = "Enter a valid email address";
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      setIsLoading(true);
      setApiError("");

      const loginEndpoint = "https://api.edsurance.in/api/auth/user/login";

      try {
        const response = await axios.post(loginEndpoint, {
          email: formData.userid,
          password: formData.password,
        });

        // Use the auth context to login
        login(response.data.user, response.data.token);

        // Redirect to home page
        navigate("/");
      } catch (error) {
        setApiError(
          error.response?.data?.msg || "Login failed. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="section-title position-relative mb-4 text-center">
            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
              Login Now
            </h6>
          </div>
          <div className="container mt-5 mb-5 col-md-6">
            {/* <h2 className="mb-4 text-center">User Login</h2> */}

            {apiError && (
              <div className="alert alert-danger" role="alert">
                {apiError}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-12 mb-2">
                  <label htmlFor="userid" className="form-label">
                    Email *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.userid ? "is-invalid" : ""
                    }`}
                    id="userid"
                    value={formData.userid}
                    onChange={handleChange}
                  />
                  {errors.userid && (
                    <div className="invalid-feedback">{errors.userid}</div>
                  )}
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="password" className="form-label">
                    Password *
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
              <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="text-center mt-2">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
