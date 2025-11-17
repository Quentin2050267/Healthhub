import React, { useState } from 'react';
import '../styles/VerifyEmail.css'; // Import CSS file
import axios from 'axios';
import { useNavigate } from "react-router-dom";

/**
 * VerifyEmail component
 * This component renders the email verification page, including the form for entering the verification code.
 */
const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [trueCode] = useState(localStorage.getItem('verifyCode'));
  const [formData] = useState(JSON.parse(localStorage.getItem('user')));

  const navigate = useNavigate();
  const port = process.env.REACT_APP_PORT;
  const backendUrlVerify = `http://localhost:${port}/verify-email`;

  /**
   * handleChange function
   * Handles changes to the input field for the verification code.
   * @param {object} e - The event object.
   */
  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
      setError(false);
    }
  };

  /**
   * handleBlur function
   * Handles the blur event on the input field and validates the code length.
   */
  const handleBlur = () => {
    if (code.length !== 6) {
      setCode('');
      setError(true);
      alert('Please enter a 6-digit code');
    } else {
      // Automatically submit the form
      handleSubmit();
    }
  };

  /**
   * handleSubmit function
   * Handles the submission of the verification code.
   */
  const handleSubmit = () => {
    axios.post(backendUrlVerify, { trueCode: trueCode, code: code, formData: formData }).then((response) => {
      if (response.data.flag) {
        navigate('/login');
        alert('Email verified');
      } else {
        alert('Code is incorrect');
        setCode('');
      }
    }).catch((error) => {
      console.error('Error verifying email:', error);
      return error;
    });
  };

  return (
    <div className="verify-email-section">
      <div className="verify-email-container">
        <h2>Please enter the 6-digit code sent to your email</h2>
        <input
          type="text"
          value={code}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength="6"
          className={`verify-email-input ${error ? 'error' : ''}`}
          placeholder="code"
        />
      </div>
    </div>
  );
};

export default VerifyEmail;