import React, { useState } from "react";
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

  const navigate = useNavigate()

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/")
  })

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
          <div className="form">
            {showPassword ? (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            ) : (
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
              />
            )}

            {!showPassword ? (
              <button onClick={() => setShowPassword(true)}>Get Started <SlArrowRight/></button>
            ) : (
              <button onClick={handleSignIn}>Sign Up</button>
            )}
          </div>
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
      margin: 1.2rem 0;
    }
  }
  .form {
    /* display: grid;
    width: 60%;
    grid-template-columns: ${({ showPassword }) =>
      showPassword ? "1fr 1fr" : "2fr 1fr"}; */
    input {
      color: white;
      padding: 1rem;
      font-size: 1.2rem;
      width: 20rem;
      border: 1px solid #ffffff5c;
      border-radius: 0.5rem;
      background: transparent;
      &:focus {
        outline: none;
      }
    }
    input[type="email"]::placeholder {
      color: #ffffffbf;
    }
    button {
      padding: 1rem;
      margin-left: 0.5rem;
      background-color: red;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 1.05rem;
      width: 10rem;
      font-weight: bold;
    }
  }
`;

export default SignUpPage;
