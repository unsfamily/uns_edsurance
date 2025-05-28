import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div class="container mt-4">
        <h4>Privacy Policy</h4>

        <p>
          Edsurance Products is committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy outlines our practices regarding the collection, use, and
          safeguarding of your data.
        </p>

        <h6>Information We Collect:</h6>
        <p>
          We may collect personal information such as your name, contact
          information, shipping address, and payment details when you make a
          purchase on our website.
        </p>

        <h6>
          We may also collect non-personal information, including your IP
          address, browser type, and device information to enhance your browsing
          experience.
        </h6>

        <h6>How We Use Your Information:</h6>
        <p>
          We use your personal information to process your orders, provide
          customer support, and communicate with you about your purchases.
        </p>

        <h6>
          Your non-personal information helps us improve our website and tailor
          your user experience.
        </h6>

        <h6>Data Security:</h6>
        <p>
          We employ industry-standard security measures to protect your data
          from unauthorized access, disclosure, or alteration.
        </p>

        <h6>Disclosure of Information:</h6>
        <p>
          We do not sell, trade, or share your personal information with third
          parties except as necessary to fulfill your orders or when required by
          law.
        </p>

        <h6>Cookies:</h6>
        <p>
          We use cookies to enhance your browsing experience and provide
          personalized content. You can manage your cookie preferences in your
          browser settings.
        </p>

        <h6>Your Choices:</h6>
        <p>
          You have the right to access, correct, or delete your personal
          information. Please contact us to exercise these rights.
        </p>

        <h6>Changes to Privacy Policy:</h6>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          our practices. Any significant updates will be communicated to you via
          our website.
        </p>

        <h6>Contact Us:</h6>
        <p>
          If you have any questions or concerns about your privacy or this
          Privacy Policy, please contact us at support@edsurance.in.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
