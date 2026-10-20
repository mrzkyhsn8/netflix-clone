import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import styled from "styled-components";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { firebaseAuth } from "../utils/firebase-config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
    } catch (err) {
      console.error(err);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Failed to log in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <BackgroundImage />
      <div className="loginContent">
        <Header />
        <div className="form-wrapper">
          <div className="form">
            <div className="title">
              <h1>Log In</h1>
            </div>
            {error && <div className="error-message">{error}</div>}
            <form className="container" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Logging In..." : "Login"}
              </button>
              <div className="signup-prompt">
                <span>New to Netflix? </span>
                <Link to="/signup">Sign up now.</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  .loginContent {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    grid-template-columns: 15vh 85vh;
  }
  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    height: 85vh;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: rgba(0, 0, 0, 0.6);
    height: 70vh;
    padding: 2rem;
    color: white;
    border-radius: 0.4rem;

    .error-message {
      background-color: #e87c03;
      color: white;
      padding: 0.75rem 1rem;
      border-radius: 0.3rem;
      font-size: 0.95rem;
      width: 25rem;
      text-align: center;
      box-sizing: border-box;
    }
    .container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      input {
        border-radius: 0.4rem;
        padding: 0.5rem;
        width: 25rem;
        height: 2.4rem;
        outline: none;
        border: none;
        box-sizing: border-box;
      }
      button {
        padding: 0.5rem;
        background-color: red;
        border: none;
        border-radius: 0.4rem;
        cursor: pointer;
        height: 3.4rem;
        color: white;
        font-weight: bolder;
        font-size: 1.05rem;
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
      .signup-prompt {
        color: #737373;
        font-size: 0.95rem;
        a {
          color: white;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

export default LoginPage;
