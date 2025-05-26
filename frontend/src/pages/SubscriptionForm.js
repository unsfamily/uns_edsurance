// src/pages/Register.js
import { useState, useContext } from "react";
import axios from "axios";
import affiliationBoardOptions from "../constants/affiliationBoards";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import { AuthContext } from "../context/AuthContext"; // assumes you store user context after login
// import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext"; // ✅ CORRECT

function SubscriptionForm() {
  //   const { user } = useContext(AuthContext); // contains userId, email, etc.
  const { currentUser, updateSubscription } = useAuth(); // ✅ Use context correctly
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User is not logged in");
      return;
    }
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await axios.post(
        "https://api.edsurance.in/api/auth/user/subscribe",
        { ...form, userId: currentUser.id },
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || "Subscription failed");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Subscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6 mb-2">
              <label className="form-label">School Name</label>
              <input
                name="institution_name"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">School Address</label>
              <textarea
                name="school_address"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Affiliation Board</label>
              <select
                className="form-select"
                name="affiliation_board"
                value={form.affiliation_board || ""}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Board --</option>
                {affiliationBoardOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Correspondent Name</label>
              <input
                name="correspondent_name"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Principal Name</label>
              <input
                name="principal_name"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Principal Contact</label>
              <input
                name="principal_contact"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Principal Email</label>
              <input
                name="principal_email"
                type="email"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Branches (if any)</label>
              <textarea
                name="branches"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">School Email</label>
              <input
                name="school_email"
                type="email"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">School Website</label>
              <input
                name="school_website"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">School Mobile</label>
              <input
                name="school_mobile"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">School Landline</label>
              <input
                name="school_landline"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Student Strength</label>
              <textarea
                name="student_strength"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Teaching Staff Count</label>
              <input
                name="teaching_staff_count"
                type="number"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">2 Representatives</label>
              <textarea
                name="representatives"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="declaration"
                onChange={handleChange}
                required
              />
              <label className="form-check-label">
                I declare the above is true and we’ll attend the award ceremony.
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>

            {msg && <div className="alert alert-success mt-3">{msg}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SubscriptionForm;
