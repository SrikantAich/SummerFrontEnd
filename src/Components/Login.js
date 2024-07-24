import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import Image from "../assets/Image.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = () => {
    // Hardcoded username and password
    const hardcodedEmail = "user@example.com";
    const hardcodedPassword = "password";

    // Validate the input values
    if (email === hardcodedEmail && password === hardcodedPassword) {
      alert("Login Successful");
      navigate('/main'); // Redirect to home page
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Image Loading" />
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
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={handleLogin}>Log In</button>
                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button>
                <h3>Id:user@example.com</h3>
                <h3>Password:password</h3>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
