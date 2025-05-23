import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Subscription = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate('/register');
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center position-relative mb-5">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  Premium Access Required
                </h6>
                <h1 className="display-4">Subscribe to Access Premium Content</h1>
              </div>
              <div className="bg-light p-5 rounded shadow">
                <div className="text-center mb-4">
                  <h3>Unlock Premium Features</h3>
                  <p className="lead">
                    Get access to our complete library of eBooks, exclusive training materials, 
                    and premium educational resources for your school.
                  </p>
                </div>
                
                <div className="row justify-content-center mb-4">
                  <div className="col-md-6">
                    <div className="bg-white p-4 text-center border rounded">
                      <h4>Benefits Include:</h4>
                      <ul className="list-unstyled">
                        <li className="mb-2">✓ Access to thousands of eBooks</li>
                        <li className="mb-2">✓ Free custom website for your school</li>
                        <li className="mb-2">✓ Exclusive online training sessions</li>
                        <li className="mb-2">✓ Networking opportunities</li>
                        <li className="mb-2">✓ AI-powered educational tools</li>
                      </ul>
                      <button 
                        className="btn btn-primary btn-block mt-3"
                        onClick={handleSubscribe}
                      >
                        Subscribe Now
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p>
                    Already have an account?{" "}
                    <button 
                      className="btn btn-link p-0"
                      onClick={() => navigate('/login')}
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Subscription;
