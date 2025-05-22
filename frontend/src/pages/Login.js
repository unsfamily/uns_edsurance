import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userid: "",
    password: "",
  });

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

  const handleSubmit = (e) => {
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
      console.log("Form submitted successfully:", formData);
      alert("Login successful!");
      setFormData({ userid: "", password: "" });
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="section-title position-relative mb-4">
            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
              Login Now
            </h6>
          </div>
          <div className="container mt-5 mb-5">
            <h2 className="mb-4 text-center">Register User Login</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6 mb-2">
                  <label htmlFor="userid" className="form-label">
                    User ID (Email Id) *
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
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
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
