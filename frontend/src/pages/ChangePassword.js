import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api.edsurance.in/api/auth/user/change-password",
        form,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error changing password");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
          {msg && <div className="mt-3 alert alert-info">{msg}</div>}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
