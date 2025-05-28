// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { AuthProvider } from "./context/AuthContext";
import Subscription from "./pages/Subscription";
import EBook from "./pages/EBook";
import OnlineTraining from "./pages/OnlineTraining";
import OfflineTraining from "./pages/OfflineTraining";
import FreeWebsites from "./pages/FreeWebsites";
import Networking from "./pages/Networking";
import SubscriptionRegister from "./pages/SubscriptionRegister";
import SubscriptionForm from "./pages/SubscriptionForm";
import Lms from "./pages/Lms";
import CollaborativeProjects from "./pages/CollaborativeProjects";
import Industry from "./pages/Industry";
import DigitalVideos from "./pages/DigitalVideos";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndCondition from "./pages/TermsAndCondition";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/ebook" element={<EBook />} />
          <Route path="/online-training" element={<OnlineTraining />} />
          <Route path="/offline-training" element={<OfflineTraining />} />
          <Route path="/free-websites" element={<FreeWebsites />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/lms" element={<Lms />} />
          <Route
            path="/collaborative-projects"
            element={<CollaborativeProjects />}
          />
          <Route path="/industry" element={<Industry />} />
          <Route path="/digital-videos" element={<DigitalVideos />} />
          <Route
            path="/subscription-register"
            element={<SubscriptionRegister />}
          />
          <Route path="/subscription-form" element={<SubscriptionForm />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndCondition />} />
          {/* Add more routes as needed */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
