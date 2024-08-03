import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification, message } from 'antd';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from "../assets/Image.png";
import GoogleSvg from "../assets/icons8-google.svg";
import "./Login.css";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("user@example.com"); // Prefill with the hardcoded email
  const [password, setPassword] = useState("password"); // Prefill with the hardcoded password
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Display notification about testing credentials
    notification.info({
      message: 'Testing Information',
      description: (
        <div className="notification-content">
          <h4>Please Note</h4>
          <p>The credentials are hardcoded for testing purposes</p>
        </div>
      ),
      duration: 2, // Set to 2 seconds for automatic disappearance
      style: { // Inline styles for the notification
        border: '1px solid #108ee9',
        backgroundColor: '#e6f7ff',
        borderRadius: '10px',
      },
    });
  }, []); // Empty dependency array ensures it runs only once

  const handleLogin = () => {
    // Hardcoded username and password
    const hardcodedEmail = "user@example.com";
    const hardcodedPassword = "password";

    // Validate the input values
    if (email === hardcodedEmail && password === hardcodedPassword) {
      messageApi.open({
        type: 'success',
        content: 'Login successful! You are being redirected...',
      });
      setTimeout(() => {
        navigate('/main'); // Redirect to home page after a short delay
      }, 1500); // Delay for 1.5 seconds to allow user to see the message
    } else {
      messageApi.open({
        type: 'error',
        content: 'Invalid email or password',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="login-main">
        <div className="login-left">
          <img src={Image} alt="Login Illustration" />
        </div>
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-center">
              <h2>Admin Panel</h2>
              <h2>Welcome back!</h2>
              <p>Please enter your details</p>
              <form>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
                <div className="pass-input-div">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                  />
                  {showPassword ? (
                    <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </div>

                <div className="login-center-options">
                  <div className="remember-div">
                    <input type="checkbox" id="remember-checkbox" />
                    <label htmlFor="remember-checkbox">
                      Remember for 30 days
                    </label>
                  </div>
                  <a href="/reset-password" className="forgot-pass-link">
                    Forgot password?
                  </a>
                </div>
                <div className="login-center-buttons">
                  <button type="button" onClick={handleLogin}>Log In</button>
                  <button type="button">
                    <img src={GoogleSvg} alt="Google login" />
                    Log In with Google
                  </button>
                </div>
              </form>
            </div>

            <p className="login-bottom-p">
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
