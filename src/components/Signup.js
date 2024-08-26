// src/components/Signup.js

import React, { useRef } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className="main ">
      <div className="main-block">
        <div className="form-block">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input className="form-control mb-4" type="text" ref={nameRef} placeholder="Name" required />
            <label>Email Address</label>
            <input className="form-control mb-4" type="email" ref={emailRef} placeholder="Email" required />
            <label>Password</label>
            <input className="form-control mb-4" type="password" ref={passwordRef} placeholder="Password" required />
            <div className="footer">
              <b className="error">{""}</b>
              <button type="submit">
                Signup
              </button>
              <p>
                Already have an account?{" "}
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;