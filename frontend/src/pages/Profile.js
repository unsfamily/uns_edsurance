import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Profile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.edsurance.in/api/auth/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Failed to load profile", err));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>User Profile</h3>
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Subscribed:</strong> {profile.is_subscribed ? "Yes" : "No"}
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
