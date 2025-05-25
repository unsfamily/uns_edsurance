import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Industry = () => {
  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container ">
          <h2 className="text-center text-info mb-4">
            📋 Industry Partnerships
          </h2>
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">
              Internships with leading companies for real-world experience
            </li>
            <li className="list-group-item">
              Job placements across diverse industries and sectors
            </li>
            <li className="list-group-item">
              Collaborative research projects with industry mentors
            </li>
            <li className="list-group-item">
              Workshops and seminars by industry leaders
            </li>
            <li className="list-group-item">
              Opportunities for co-developing innovative solutions
            </li>
          </ul>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary">
            Enroll in UNS for this facility
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Industry;
