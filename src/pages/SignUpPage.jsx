import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { SlArrowRight } from "react-icons/sl";

import { firebaseAuth } from "../utils/firebase-config";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleNext = (e) => {
    e?.preventDefault();
    if (!formValues.email || !formValues.email.includes("@")) {
      setError("Please enter a valid email address to get started.");
      return;
    }
    setError("");
    setShowPassword(true);
  };

  const handleSignUp = async (e) => {
    e?.preventDefault();
    const { email, password } = formValues;
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please sign in instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Failed to create an account.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body">
          <div className="text">
            <h1>Unlimited movies, TV Shows, and more</h1>
            <h3>Starts at IDR 54,000. Cancel anytime.</h3>
            <h4>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h4>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="form" onSubmit={showPassword ? handleSignUp : handleNext}>
            {!showPassword ? (
              <>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
                <button type="submit">
                  Get Started <SlArrowRight />
                </button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  placeholder="Password (min. 6 characters)"
                  name="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  autoFocus
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.79);
    height: 100%;
    width: 100%;
    grid-template-columns: 15vh 85vh;
    .body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .text {
      display: flex;
      flex-direction: column;
      text-align: center;
      color: white;
    }
    h1 {
      padding: 0 25rem;
    }
    h3 {
      margin-top: 1rem;
    }
    h4 {
      font-weight: 500;
    .error-message {
      background-color: #e87c03;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.3rem;
      font-size: 1rem;
      margin-bottom: 1rem;
      text-align: center;
      max-width: 30rem;
    }
  }
  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      color: white;
      padding: 1rem;
      font-size: 1.2rem;
      width: 20rem;
      border: 1px solid #ffffff5c;
      border-radius: 0.5rem;
      background: rgba(0, 0, 0, 0.4);
      &:focus {
        outline: none;
        border-color: white;
      }
    }
    input[type="email"]::placeholder,
    input[type="password"]::placeholder {
      color: #ffffffbf;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem;
      margin-left: 0.5rem;
      background-color: red;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      color: white;
      font-size: 1.05rem;
      width: 11rem;
      font-weight: bold;
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`;

export default SignUpPage;
