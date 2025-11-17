import React from "react";
import "../../styles/Footer.css";

/**
 * Footer component
 * This component renders the footer section of the website, including contact information and social media links.
 */
function Footer() {
  return (
    <div>
      <footer className="footer bg-zinc-100">
        <div className="footer-container mx-auto py-6">
          <h1 className="footer-title">Health Hub</h1>
          <div className="footer-grid">
            <div className="footer-section">
              <h2 className="footer-heading">Contact Us</h2>
              <ul className="footer-list">
                <li className="footer-item">
                  <a href="mailto:2315902845@qq.com" className="footer-link">
                    Qin Tian
                  </a>
                </li>
                <li className="footer-item">
                  <a href="mailto:2210354438@qq.com" className="footer-link">
                    Xu Yi
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h2 className="footer-heading">Connect</h2>
              <ul className="footer-list">
                <li className="footer-item">
                  <a href="https://github.com/IT5007-2410/course-project-group-1" className="footer-link" target="_blank" title="Github">
                    <img src="./GithubIcon.svg" alt="Github logo" className="footer-icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear().toString()} NUS IT5007 Group 1. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;