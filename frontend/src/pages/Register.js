import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
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

    // Validation
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
      formIsValid = false;
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
      formIsValid = false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      formIsValid = false;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
      formIsValid = false;
    } else if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Enter a valid 10-digit phone number";
      formIsValid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      formIsValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formIsValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
      formIsValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      setIsLoading(true);
      setApiError("");

      try {
        const response = await axios.post(
          "https://api.edsurance.in/api/auth/user/register",
          {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password,
            phone_number: formData.phone_number,
          }
        );

        // Show success message
        alert(response.data.msg || "Registration successful!");

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        setApiError(
          error.response?.data?.msg || "Registration failed. Please try again."
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
          <div className="section-title position-relative mb-4">
            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
              Register Now
            </h6>
          </div>
          <div className="container mt-5 mb-5">
            <h2 className="mb-4 text-center">User Registration</h2>
            {apiError && (
              <div className="alert alert-danger" role="alert">
                {apiError}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6 mb-2">
                  <label htmlFor="firstname" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.firstname ? "is-invalid" : ""
                    }`}
                    id="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && (
                    <div className="invalid-feedback">{errors.firstname}</div>
                  )}
                </div>
                <div className="col-md-6 mb-2">
                  <label htmlFor="lastname" className="form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.lastname ? "is-invalid" : ""
                    }`}
                    id="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                  {errors.lastname && (
                    <div className="invalid-feedback">{errors.lastname}</div>
                  )}
                </div>
                <div className="col-md-6 mb-2">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="col-md-6 mb-2">
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.phone_number ? "is-invalid" : ""
                    }`}
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                  {errors.phone_number && (
                    <div className="invalid-feedback">
                      {errors.phone_number}
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-2">
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
                <div className="col-md-6 mb-2">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
              <div className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
