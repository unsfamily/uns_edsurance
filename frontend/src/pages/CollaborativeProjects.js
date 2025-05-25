import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CollaborativeProjects = () => {
  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container-fluid py-5">
          <div className="container py-5">
            <h2 className="text-center text-warning mb-4">
              <i className="fas fa-project-diagram"></i> Collaborative projects
            </h2>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item">
                Joint research projects across disciplines
              </li>
              <li className="list-group-item">
                Student exchange programs for cultural and academic growth
              </li>
              <li className="list-group-item">
                Collaborative product development with industry mentors
              </li>
              <li className="list-group-item">
                Inter-institutional innovation challenges
              </li>
              <li className="list-group-item">
                Global problem-solving competitions
              </li>
            </ul>
          </div>
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

export default CollaborativeProjects;
