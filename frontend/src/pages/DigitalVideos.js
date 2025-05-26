import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DigitalVideos = () => {
  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container ">
          <h2 className="text-center text-info mb-4">
            {" "}
            <i className="fas fa-video"></i> Digital Videos
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="info-box">
                <div className="video-frame">
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Sample Video"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-box">
                <div className="video-frame">
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Sample Video"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-box">
                <div className="video-frame">
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Sample Video"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary">
          Enroll in UNS for this facility
        </button>
      </div>

      <Footer />
    </>
  );
};

export default DigitalVideos;
