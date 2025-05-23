import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Modal, Button } from "react-bootstrap";

// Try a different approach instead of react-pdf
const EBook = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [iframeKey, setIframeKey] = useState(0); // Add a key to force iframe refresh
  const iframeRef = useRef(null);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/subscription');
    }
  }, [isAuthenticated, navigate]);

  // Open PDF viewer modal
  const handleOpenPdf = (book) => {
    setSelectedBook(book);
    setShowPdfModal(true);
  };

  // Close PDF viewer modal
  const handleClosePdf = () => {
    setShowPdfModal(false);
    setSelectedBook(null);
  };

  // Zoom functions using CSS transform instead of PDF parameters
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };
  
  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };
  
  // Page navigation with iframe refresh
  const nextPage = () => {
    setCurrentPage(prev => {
      const newPage = prev + 1;
      refreshIframe(newPage);
      return newPage;
    });
  };
  
  const prevPage = () => {
    setCurrentPage(prev => {
      const newPage = Math.max(prev - 1, 1);
      refreshIframe(newPage);
      return newPage;
    });
  };
  
  // Function to refresh iframe for page changes only
  const refreshIframe = (page) => {
    if (iframeRef.current) {
      const url = `${selectedBook.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=${page}`;
      iframeRef.current.src = url;
    }
  };
  
  // Reset zoom and page when opening a new PDF
  useEffect(() => {
    if (showPdfModal) {
      setZoomLevel(100);
      setCurrentPage(1);
      setIframeKey(prev => prev + 1); // Reset iframe
    }
  }, [showPdfModal, selectedBook]);

  // Sample eBook data with PDF URLs pointing to local files
  const ebooks = [
    {
      id: 1,
      title: "Advanced Mathematics for Grade 10",
      author: "Dr. Jane Smith",
      cover: "feature.jpg",
      category: "Mathematics",
      description: "A comprehensive guide to advanced mathematics concepts for 10th grade students.",
      pdfUrl: `${process.env.PUBLIC_URL}/pdf/e31daba2-d427-4bf9-bf36-4a6b6b42d9c2.pdf` 
    },
    {
      id: 2,
      title: "Introduction to Physics",
      author: "Prof. Robert Johnson",
      cover: "nasa.jpg",
      category: "Science",
      description: "Learn the fundamentals of physics with practical examples and exercises.",
      pdfUrl: `${process.env.PUBLIC_URL}/pdf/intro-physics.pdf`
    },
    {
      id: 3,
      title: "World History: Modern Era",
      author: "Dr. Michael Brown",
      cover: "team-1.jpg",
      category: "History",
      description: "Explore the significant events that shaped the modern world from 1750 to present.",
      pdfUrl: `${process.env.PUBLIC_URL}/pdf/world-history.pdf`
    },
    {
      id: 4,
      title: "English Literature Classics",
      author: "Elizabeth Wilson",
      cover: "team-2.jpg",
      category: "Literature",
      description: "A collection of classic literature works with analysis and interpretation.",
      pdfUrl: `${process.env.PUBLIC_URL}/pdf/english-literature.pdf`
    },
    {
      id: 5,
      title: "Computer Science Fundamentals",
      author: "Tech Education Group",
      cover: "team-3.jpg",
      category: "Technology",
      description: "Introduction to programming, algorithms, and computer science principles.",
      pdfUrl: `${process.env.PUBLIC_URL}/pdf/computer-science.pdf`
    },
    {
      id: 6,
      title: "Biology: Understanding Life",
      author: "Dr. Sarah Thompson",
      cover: "team-4.jpg",
      category: "Science",
      description: "Comprehensive guide to understanding biological systems and processes.",
      pdfUrl: `${process.env.PUBLIC_URL}/pdf/biology.pdf`
    }
  ];

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="section-title text-center position-relative mb-5">
            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
              Premium eBook Library
            </h6>
            <h1 className="display-4">Explore Our Collection of Educational eBooks</h1>
          </div>

          <div className="row">
            {ebooks.map(book => (
              <div className="col-lg-4 col-md-6 mb-4" key={book.id}>
                <div className="rounded overflow-hidden mb-2 h-100 shadow">
                  <img 
                    className="img-fluid w-100" 
                    src={require(`../assets/images/${book.cover}`)} 
                    alt={book.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="bg-white p-4">
                    <div className="d-flex mb-2">
                      <small className="m-0 me-2">
                        <i className="fa fa-user text-primary mr-1"></i> {book.author}
                      </small>
                      <small className="m-0">
                        <i className="fa fa-folder text-primary mr-1"></i> {book.category}
                      </small>
                    </div>
                    <h5>{book.title}</h5>
                    <p className="m-0">{book.description}</p>
                    <div className="text-center mt-3">
                      <button 
                        className="btn btn-primary"
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
              <div style={{ 
                height: 'calc(100vh - 114px)', 
                width: '100%', 
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ 
                  transform: `scale(${zoomLevel/100})`, 
                  transformOrigin: 'center center',
                  transition: 'transform 0.2s ease-in-out',
                  width: `${100 * 100/zoomLevel}%`,
                  height: `${100 * 100/zoomLevel}%`
                }}>
                  <iframe
                    ref={iframeRef}
                    key={iframeKey}
                    src={`${selectedBook?.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=${currentPage}`}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    title={selectedBook?.title}
                    style={{ border: 'none', display: 'block' }}
                  ></iframe>
                </div>
              </div>
              
              {/* PDF Controls */}
              {/* <div className="pdf-controls bg-light p-2 d-flex justify-content-center align-items-center">
                <div className="btn-group me-3">
                  <button className="btn btn-sm btn-outline-secondary" onClick={zoomOut} title="Zoom Out">
                    <i className="fa fa-search-minus"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" disabled>
                    {zoomLevel}%
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={zoomIn} title="Zoom In">
                    <i className="fa fa-search-plus"></i>
                  </button>
                </div>
                
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-primary" onClick={prevPage} disabled={currentPage === 1} title="Previous Page">
                    <i className="fa fa-chevron-left"></i> Prev
                  </button>
                  <button className="btn btn-sm btn-outline-primary" disabled>
                    Page {currentPage}
                  </button>
                  <button className="btn btn-sm btn-outline-primary" onClick={nextPage} title="Next Page">
                    Next <i className="fa fa-chevron-right"></i>
                  </button>
                </div>
                
                <button className="btn btn-sm btn-secondary ms-3" onClick={handleClosePdf}>
                  Close
                </button>
              </div> */}
              
              {/* Overlay for top area */}
              <div 
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '40px',
                  background: 'transparent',
                  zIndex: 999
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
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
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
