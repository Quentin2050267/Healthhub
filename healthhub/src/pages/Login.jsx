import React, { useState, useEffect } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css'; // Import CSS file
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import axios from "axios";

/**
 * LoginPage component
 * This component renders the login page, including Google login and email/password login.
 */
function LoginPage() {
  const { user, login } = useAuth();
  const [passVis, setPassVis] = useState(false);
  const clientId = process.env.REACT_APP_AUTH_GOOGLE_CLIENT_ID;
  const port = process.env.REACT_APP_PORT;
  const backendUrl = `http://localhost:${port}/login`;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  /**
   * onSuccess function
   * Handles the success response from Google login.
   * @param {object} response - The response object from Google login.
   */
  const onSuccess = (response) => {
    login(response);
  };

  /**
   * onError function
   * Handles the error response from Google login.
   * @param {object} response - The response object from Google login.
   */
  const onError = (response) => {
    console.log('Login Failed:', response);
  };

  /**
   * handleChange function
   * Handles changes to the input fields in the login form.
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
   * handleSubmit function
   * Handles the submission of the login form.
   * @param {object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    axios.post(backendUrl, formData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        login(response.data.user);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <section className="login-section">
        <div className="login-container">
          <div className="login-logo">
            <img className="login-logo-img" src="/icon.svg" alt="logo" />
            <div>Health Hub</div>
          </div>
          <div className="login-card">
            <div className="login-card-content">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <GoogleLogin
                  onSuccess={onSuccess}
                  onError={onError}
                  useOneTap
                  size="large"
                  width="320px"
                  locale="en"
                />
              </div>
              <h1 className="login-title">Or</h1>
              <form className="login-form" onSubmit={handleSubmit}>
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
                  <span
                    onClick={() => setPassVis(!passVis)}
                    className="password-toggle"
                  >
                    {passVis ? <IoEyeOff className="h-5 w-5" /> : <IoEye className="h-5 w-5" />}
                  </span>
                </div>
                <button type="submit" className="submit-button">
                  Sign in
                </button>
                <p className="signup-link">
                  Don’t have an account?{" "}
                  <Link to="/signup">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;