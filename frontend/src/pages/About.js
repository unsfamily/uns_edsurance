import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StatsGrid from "../components/StatsGrid";

const About = () => {
  return (
    <>
      <Header />
      <div class="container-fluid py-2">
        <div class="container">
          <h3 class="abus">About Us</h3>

          <div class="aboutus">
            <h3>
              <i class="fas fa-unlock"></i> Unlocking Potential
            </h3>
            <p>
              Imagine a platform that unlocks the full potential of every
              student. A platform that empowers parents, inspires learners, and
              nurtures future leaders.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-users"></i> Our Team
            </h3>
            <p>
              We're proud to introduce an app that's backed by 120+ Awardee
              Scientists, including renowned experts from the International
              Forum of Scientists and NASA, and 150+ Professors, Mental Health
              Professionals, Scholars, and R&D Professionals. Our team includes
              national and international awardees who are passionate about
              education and innovation.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-child"></i> Art of Parenting
            </h3>
            <p>
              Empower your parenting journey with expert guidance. Learn how to
              nurture emotional intelligence, build resilience, and foster a
              growth mindset in your child.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-video"></i> 100 Story Videos
            </h3>
            <p>
              Stories have the power to inspire and educate. Our 100 story
              videos bring to life tales of courage, perseverance, and kindness,
              sparking imagination and creativity in young minds.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-book"></i> 100 Important Ebooks
            </h3>
            <p>
              Knowledge is power. Our collection of 100 ebooks covers a wide
              range of subjects, from science and history to literature and art,
              fueling curiosity and broadening perspectives.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-quote-left"></i> Motivational Quote Posters
            </h3>
            <p>
              Words have the power to inspire and motivate. Our motivational
              quote posters provide daily doses of encouragement, helping
              students develop a positive mindset and build resilience.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-graduation-cap"></i> 100 Educational Videos
            </h3>
            <p>
              Learning should be fun and engaging. Our 100 educational videos
              make complex concepts accessible and entertaining, covering topics
              from science and technology to art and culture.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-robot"></i> AI and AR Coaching
            </h3>
            <p>
              Our AI and AR experts teach important concepts to students up to
              Grade 12, including AI fundamentals, machine learning, programming
              skills, and AR development. Students learn about AI applications,
              computer vision, natural language processing, and AR in education
              and real-world scenarios.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-book-open"></i> 25 Must-Read Books
            </h3>
            <p>
              Reading opens doors to new worlds and perspectives. Our 25
              must-read books, presented in video format, introduce students to
              classic literature, contemporary fiction, and non-fiction,
              fostering a love for reading.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-bullhorn"></i> 25 Power Talks
            </h3>
            <p>
              Leadership is about inspiring and empowering others. Our 25 power
              talks feature historical leaders, innovators, and change-makers,
              providing insights into their journeys, struggles, and successes.
            </p>
          </div>

          <div class="aboutus">
            <h3>
              <i class="fas fa-layer-group"></i> Comprehensive Resources
            </h3>
            <p>
              With our comprehensive app, students can access a wide range of
              resources, including self-assessment platforms, professionals'
              counselling, live online sessions, and more. Our app is designed
              to support students in every aspect of their educational journey.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
