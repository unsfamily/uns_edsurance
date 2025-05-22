import React from "react";

const Footer = () => {
  return (
    <>
      <div
        className="container-fluid position-relative overlay-top bg-pink text-white-50 py-5"
        style={{ marginTop: "20px" }}
      >
        <div className="text-center">
          <h3 className="text-white mb-4">Quick Links</h3>
          <div className="text-center">
            <a className="text-white mb-2 mr-4" href="#">
              <i className="fa fa-angle-right mr-2"></i>Privacy Policy
            </a>
            <a className="text-white mb-2 mr-4" href="#">
              <i className="fa fa-angle-right mr-2"></i>Terms & Condition
            </a>
            <a className="text-white mb-2 mr-4" href="#">
              <i className="fa fa-angle-right mr-2"></i>Regular FAQs
            </a>
            <a className="text-white mb-2 mr-4" href="#">
              <i className="fa fa-angle-right mr-2"></i>Help & Support
            </a>
            <a className="text-white mr-4" href="#">
              <i className="fa fa-angle-right mr-2"></i>Contact
            </a>
          </div>
        </div>
      </div>

      <div
        className="container-fluid bg-dpink text-white-50 border-top py-4"
        style={{ borderColor: "rgba(256, 256, 256, 0.1)" }}
      >
        <div className="container">
          <div className="text-center">
            <p className="m-0">
              Copyright &copy;{" "}
              <a className="text-white" href="#">
                Edsurance
              </a>
              . All Rights Reserved 2025.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
