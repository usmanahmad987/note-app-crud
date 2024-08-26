// src/components/Login.js

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

import "../assets/css/login.css"

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="main ">
      <div className="main-block">
        <div className="form-block">
          <h2 className="text-center mb-6">Login Form</h2>
          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input className="form-control mb-4" type="email" ref={emailRef} placeholder="Email" required />
          <label>Password</label>
          <input className="form-control mb-4" type="password" ref={passwordRef} placeholder="Password" required />
          
          <div className="footer">
            <b className="error">{""}</b>
            <button type="submit">Log In</button>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;