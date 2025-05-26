// src/pages/ResetPassword.js
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      const res = await axios.post(
        `https://api.edsurance.in/api/auth/user/reset-password/${token}`,
        {
          password,
        }
      );
      setMsg(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || "Reset failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Enter New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Reset Password
        </button>
      </form>
      {msg && <div className="alert alert-success mt-3">{msg}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default ResetPassword;
