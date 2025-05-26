import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const DigitalVideos = () => {
  const { isAuthenticated, hasSubscription } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API fetch
    setTimeout(() => {
      const mockVideos = [
        {
          id: 1,
          title: "Science Experiment Demo",
          description: "A practical experiment explanation",
          isPremium: true,
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          id: 2,
          title: "Basic Math Concepts",
          description: "Learn basic arithmetic",
          isPremium: false,
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          id: 3,
          title: "History Timeline Overview",
          description: "An overview of world history events",
          isPremium: true,
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
      ];
      setVideos(mockVideos);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/subscription");
    }
  }, [isAuthenticated, navigate]);

  const visibleVideos = videos.filter(
    (vid) => !vid.isPremium || hasSubscription
  );

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="section-title text-center position-relative mb-5">
            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
              🎥 Premium Video Lessons
            </h6>
            <h1 className="display-4">Watch Our Curated Digital Videos</h1>
          </div>

          {!isAuthenticated && (
            <div className="alert alert-info">
              Please <Link to="/login">login</Link> to watch videos.{" "}
              <Link to="/register" className="ml-2">
                Register here
              </Link>
              .
            </div>
          )}

          {isAuthenticated && !hasSubscription && (
            <div className="alert alert-warning">
              You're viewing free videos only.{" "}
              <Link to="/subscription-form" className="ml-2">
                Subscribe now
              </Link>{" "}
              to access all premium content!
            </div>
          )}

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-2">Loading videos...</p>
            </div>
          ) : (
            <div className="row">
              {visibleVideos.map((video) => (
                <div className="col-md-6 col-lg-4 mb-4" key={video.id}>
                  <div className="card h-100 shadow-sm">
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={video.url}
                        title={video.title}
                        allowFullScreen
                        className="rounded-top"
                      ></iframe>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {video.title}
                        {video.isPremium && (
                          <span className="badge bg-warning text-dark ms-2">
                            <i className="fa fa-star me-1" />
                            Premium
                          </span>
                        )}
                      </h5>
                      <p className="card-text">{video.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isAuthenticated &&
            !hasSubscription &&
            videos.some((v) => v.isPremium) && (
              <div className="text-center mt-5">
                <div className="card p-4 bg-light">
                  <h3>Unlock Full Video Access</h3>
                  <p>Subscribe to watch all premium educational videos.</p>
                  <Link to="/subscription-form" className="btn btn-primary">
                    Subscribe Now
                  </Link>
                </div>
              </div>
            )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DigitalVideos;
