import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StatsGrid from "../components/StatsGrid";

const About = () => {
  return (
    <>
      <Header />
      <div className="container-fluid py-2">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-5 mb-5 mb-lg-0"
              style={{ minHeight: "500px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100"
                  src={require("../assets/images/about.jpg")}
                  style={{ objectFit: "cover" }}
                  alt="About Us"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  About Us
                </h6>
                <h1 className="display-4">
                  First Choice For Online Education Anywhere
                </h1>
              </div>
              <p>
                At Edsurance, we are committed to transforming education by
                providing a rich blend of online and offline resources that
                empower educators, learners, and institutions alike. Our digital
                offerings include access to vast e-learning platforms, digital
                libraries, educational software, and virtual workshops that
                foster innovation, collaboration, and continuous learning.
                Offline, we facilitate professional development through hands-on
                training, networking events, mentorship programs, and
                collaborative projects that connect education with real-world
                applications. We further support excellence with recognition
                programs, funding opportunities, and industry partnerships that
                open doors to research, internships, and career advancement. At
                Edsurance, we don’t just support education—we help shape its
                future.
              </p>

              <StatsGrid />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
