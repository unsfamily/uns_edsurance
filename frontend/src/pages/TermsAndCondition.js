import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsAndCondition = () => {
  return (
    <>
      <Header />
      <div class="container mt-4">
        <h4>Terms and Condition</h4>

        <p>
          By using the Edsurance Products website, you agree to comply with and
          be bound by the following Terms and Conditions:
        </p>

        <h6>Use of Website:</h6>
        <p>
          You must use this website in accordance with all applicable laws and
          regulations.
        </p>
        <p>
          You may not use our website for any unlawful or prohibited purpose.
        </p>

        <h6>Product Information:</h6>
        <p>
          Product descriptions, pricing, and availability are subject to change
          without notice.
        </p>
        <p>We reserve the right to limit the quantity of products purchased.</p>

        <h6>User Accounts:</h6>
        <p>
          You are responsible for maintaining the confidentiality of your
          account and password.
        </p>
        <p>
          You agree to notify us immediately of any unauthorized use of your
          account.
        </p>

        <h6>Intellectual Property:</h6>
        <p>
          All content on this website, including text, graphics, logos, and
          images, is the property of Edsurance Products and is protected by
          copyright and other intellectual property laws.
        </p>

        <h6>Disclaimer:</h6>
        <p>
          We do not guarantee that our website will be error-free,
          uninterrupted, or free of viruses.
        </p>
        <p>
          We are not liable for any direct, indirect, or consequential damages
          resulting from your use of our website.
        </p>

        <h6>Governing Law:</h6>
        <p>
          These Terms and Conditions are governed by the legal jurisdiction of
          Udumalpet, Tamil Nadu.
        </p>

        <h6>Contact Us:</h6>
        <p>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at{" "}
          <a href="mailto:support@edsurance.in">support@edsurance.in</a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndCondition;
