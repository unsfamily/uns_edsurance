import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";

const EBook = () => {
  const { isAuthenticated, currentUser, hasSubscription } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state for PDF viewer
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef(null);

  // Modal handlers
  const handleOpenPdf = (book) => {
    setSelectedBook(book);
    setCurrentPage(1);
    setZoomLevel(100);
    setShowPdfModal(true);
  };

  const handleClosePdf = () => {
    setShowPdfModal(false);
    setSelectedBook(null);
  };
  console.log("isSubscribed", hasSubscription);
  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 200));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const mockBooks = [
        {
          id: 1,
          title: "Advanced Mathematics for High School Students",
          author: "Dr. Sarah Johnson",
          cover: "https://via.placeholder.com/150",
          description: "Comprehensive guide for advanced mathematics concepts.",
          isPremium: true,
          category: "Mathematics",
          pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
        },
        {
          id: 2,
          title: "Introduction to Physics",
          author: "Prof. Robert Miller",
          cover: "https://via.placeholder.com/150",
          description: "Basic concepts of Physics explained in simple terms.",
          isPremium: false,
          category: "Physics",
          pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
        },
        {
          id: 3,
          title: "World History: Complete Edition",
          author: "Dr. Michael Thompson",
          cover: "https://via.placeholder.com/150",
          description:
            "A complete walkthrough of world history from ancient civilizations to modern era.",
          isPremium: true,
          category: "History",
          pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
        },
        {
          id: 4,
          title: "Biology Fundamentals",
          author: "Dr. Emily Roberts",
          cover: "https://via.placeholder.com/150",
          description:
            "Learn the basics of biology with colorful illustrations.",
          isPremium: false,
          category: "Biology",
          pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
        },
        {
          id: 5,
          title: "Advanced Chemistry Concepts",
          author: "Prof. Alan Davidson",
          cover: "https://via.placeholder.com/150",
          description:
            "Deep dive into chemical reactions and molecular structures.",
          isPremium: true,
          category: "Chemistry",
          pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
        },
        {
          id: 6,
          title: "English Literature Classics",
          author: "Dr. Lisa Montgomery",
          cover: "https://via.placeholder.com/150",
          description: "Analysis of classic works from Shakespeare to Austen.",
          isPremium: true,
          category: "Literature",
          pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
        },
      ];

      setBooks(mockBooks);
      setLoading(false);
    }, 1000);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/subscription");
    }
  }, [isAuthenticated, navigate]);

  // Filter books based on subscription status
  const visibleBooks = books.filter(
    (book) => !book.isPremium || hasSubscription
  );

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="section-title text-center position-relative mb-5">
            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
              📚 Premium eBook Library
            </h6>
            <h1 className="display-4">
              Explore Our Collection of Educational eBooks
            </h1>
          </div>

          {/* Show subscription status alerts - keeping existing logic */}
          {!isAuthenticated && (
            <div className="alert alert-info mb-4">
              <p className="mb-0">
                Please <Link to="/login">login</Link> to access our full library
                of e-books.
                <Link to="/register" className="ml-2">
                  Register now
                </Link>{" "}
                if you don't have an account!
              </p>
            </div>
          )}

          {isAuthenticated && !hasSubscription && (
            <div className="alert alert-warning mb-4">
              <p className="mb-0">
                You're currently viewing our free e-book collection.
                <Link to="/subscription-form" className="ml-2">
                  Subscribe now
                </Link>{" "}
                to access our premium collection!
              </p>
            </div>
          )}

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2">Loading e-books...</p>
            </div>
          ) : (
            <div className="row">
              {visibleBooks.map((book) => (
                <div className="col-lg-4 col-md-6 mb-4" key={book.id}>
                  <div
                    className={`rounded overflow-hidden mb-2 h-100 shadow ${
                      book.isPremium ? "border border-warning" : ""
                    }`}
                  >
                    {/* Premium badge */}
                    {book.isPremium && (
                      <div className="position-relative">
                        <div
                          className="position-absolute"
                          style={{
                            top: "10px",
                            right: "10px",
                            zIndex: 1,
                          }}
                        >
                          <span className="badge bg-warning text-dark">
                            <i className="fa fa-star mr-1"></i> Premium
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Free badge */}
                    {!book.isPremium && (
                      <div className="position-relative">
                        <div
                          className="position-absolute"
                          style={{
                            top: "10px",
                            right: "10px",
                            zIndex: 1,
                          }}
                        >
                          <span className="badge bg-success text-white">
                            <i className="fa fa-check-circle mr-1"></i> Free
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Book content */}
                    <div
                      className={`p-4 ${
                        book.isPremium ? "bg-light" : "bg-white"
                      }`}
                    >
                      <h5>
                        {book.title}
                        {book.isPremium && (
                          <small className="ms-2 text-warning">
                            <i className="fa fa-crown"></i>
                          </small>
                        )}
                      </h5>
                      <p className="m-0">{book.description}</p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <small className="text-muted">
                          <i className="fa fa-book me-1"></i> {book.category}
                        </small>
                        <button
                          className={`btn ${
                            book.isPremium ? "btn-warning" : "btn-primary"
                          }`}
                          onClick={() => handleOpenPdf(book)}
                        >
                          Read Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show lock UI for premium books - for non-subscribers */}
          {isAuthenticated &&
            !hasSubscription &&
            books.filter((book) => book.isPremium).length > 0 && (
              <div className="row mt-4">
                <div className="col-12">
                  <h3 className="text-center mb-4">Premium Content</h3>
                </div>
                {books
                  .filter((book) => book.isPremium)
                  .map((book) => (
                    <div
                      className="col-lg-4 col-md-6 mb-4"
                      key={`premium-${book.id}`}
                    >
                      <div
                        className="rounded overflow-hidden mb-2 h-100 shadow"
                        style={{ opacity: "0.7" }}
                      >
                        <div className="position-relative">
                          <div
                            className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                            style={{
                              top: 0,
                              left: 0,
                              background: "rgba(0,0,0,0.5)",
                            }}
                          >
                            <i
                              className="fa fa-lock text-white"
                              style={{ fontSize: "3rem" }}
                            ></i>
                          </div>
                        </div>
                        <div className="bg-white p-4">
                          <h5>{book.title}</h5>
                          <p className="m-0">{book.description}</p>
                          <div className="text-center mt-3">
                            <Link
                              to="/subscription-form"
                              className="btn btn-warning"
                            >
                              Subscribe to Access
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

          {/* Subscription call to action - keeping existing logic */}
          {isAuthenticated && !hasSubscription && (
            <div className="text-center mt-5">
              <div className="card p-4 bg-light">
                <h3>Upgrade Your Learning Experience</h3>
                <p className="mb-4">
                  Get full access to our premium collection of educational
                  e-books and materials.
                </p>
                <Link
                  to="/subscription-form"
                  className="btn btn-primary btn-lg"
                >
                  Subscribe Now
                </Link>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="text-center mt-5">
              <div className="card p-4 bg-light">
                <h3>Register to Access More</h3>
                <p className="mb-4">
                  Create an account to access free e-books and subscribe for
                  premium content.
                </p>
                <div>
                  <Link to="/register" className="btn btn-primary btn-lg mr-3">
                    Register
                  </Link>
                  <Link to="/login" className="btn btn-outline-primary btn-lg">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PDF Viewer Modal - Fullscreen for better reading experience */}
      <Modal
        show={showPdfModal}
        onHide={handleClosePdf}
        fullscreen={true}
        dialogClassName="pdf-modal-fullscreen"
      >
        <Modal.Header closeButton className="py-2">
          <Modal.Title>{selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 position-relative">
          {selectedBook && (
            <>
              <div
                style={{
                  height: "calc(100vh - 114px)",
                  width: "100%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: "center center",
                    transition: "transform 0.2s ease-in-out",
                    width: `${(100 * 100) / zoomLevel}%`,
                    height: `${(100 * 100) / zoomLevel}%`,
                  }}
                >
                  <iframe
                    ref={iframeRef}
                    key={iframeKey}
                    src={`${selectedBook?.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=${currentPage}`}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    title={selectedBook?.title}
                    style={{ border: "none", display: "block" }}
                  ></iframe>
                </div>
              </div>

              {/* Overlay for top area */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  height: "40px",
                  background: "transparent",
                  zIndex: 999,
                }}
              ></div>
            </>
          )}
        </Modal.Body>
        <style jsx="true">{`
          .modal-dialog.pdf-modal-fullscreen {
            margin: 0;
            max-width: 100%;
            width: 100%;
          }
          .pdf-modal-fullscreen .modal-content {
            height: 100vh;
            border-radius: 0;
            width: 100vw;
          }
          .pdf-modal-fullscreen .modal-body {
            flex: 1;
            padding: 0;
            width: 100%;
          }
          .pdf-modal-fullscreen .modal-header {
            border-bottom: 1px solid #dee2e6;
          }
          .pdf-controls {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
          }
          /* Hide toolbar elements that might appear */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-track {
            background: #f5f5f5;
          }
        `}</style>
      </Modal>

      <Footer />
    </>
  );
};

export default EBook;
