import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import '../styles/Signup.css'; // Import CSS file
import axios from 'axios';

/**
 * Signup component
 * This component renders the signup page, including the form for creating a new account.
 */
function Signup() {
  const [passVis, setPassVis] = useState(false);
  const [conVis, setConVis] = useState(false);
  const navigate = useNavigate();
  const port = process.env.REACT_APP_PORT;
  const backendUrl = `http://localhost:${port}/sign-up`;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  /**
   * handleChange function
   * Handles changes to the input fields in the signup form.
   * @param {object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * validateEmail function
   * Validates the email format.
   * @param {string} email - The email to validate.
   * @returns {boolean} - True if the email is valid, false otherwise.
   */
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  /**
   * handleSubmit function
   * Handles the submission of the signup form.
   * @param {object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    await axios.post(backendUrl, formData).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      alert('Please check your email to verify your account.');

      localStorage.setItem('verifyCode', response.data.code);
      localStorage.setItem('user', JSON.stringify(formData));
      navigate('/verify-email');
      return response;
    }).catch((error) => {
      console.error('Error verifying email:', error);
      return error;
    });
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <div className="signup-logo">
          <img className="signup-logo-img" src="/icon.svg" alt="logo" />
          <div>Health Hub</div>
        </div>
        <div className="signup-card">
          <div className="signup-card-content">
            <h1 className="signup-title">Create an account</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="name-fields">
                <div className="first-name">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="last-name">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type={passVis ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span onClick={() => setPassVis(!passVis)} className="password-toggle">
                  {passVis ? <IoEyeOff className="h-5 w-5" /> : <IoEye className="h-5 w-5" />}
                </span>
              </div>
              <div className="confirm-password">
                <label htmlFor="confirm-password">Confirm password</label>
                <input
                  type={conVis ? "text" : "password"}
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span onClick={() => setConVis(!conVis)} className="password-toggle">
                  {conVis ? <IoEyeOff className="h-5 w-5" /> : <IoEye className="h-5 w-5" />}
                </span>
              </div>
              <div className="checkbox-container">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms">I accept the <a href="#" className="forgot-password">Terms and Conditions</a></label>
                  </div>
                </div>
              </div>
              <button type="submit" className="submit-button">Create an account</button>
              <p className="signup-link">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;