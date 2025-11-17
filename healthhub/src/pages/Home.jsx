import React from "react";
import '../styles/Home.css';

/**
 * Home component
 * This component renders the home page with a welcoming message and an introduction to the services provided.
 */
function Home() {
  return (
    <div className="relative">
      <div className="block1" id="block1">
        <div className="block1-content">
          <h4 className="animate-slide-up">Your Trusted Elderly Care Partner</h4>
          <h2 className="animate-slide-up">
            <span>Comprehensive Care,</span> Compassionate Touch
          </h2>
          <p className="animate-slide-up">
            Everything Healthcare in One Click and One Ask. Expert Advice, Health Tracking, and More
          </p>
          <div className="block1-buttons">
            {/* Add buttons here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;