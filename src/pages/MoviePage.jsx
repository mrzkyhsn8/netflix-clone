import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TopNav from "../components/TopNav";
import { fetchMovies, getGenres } from "../store";
import SliderContainer from "../components/SliderContainer";

const MoviePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.netflix.movies);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movie" }));
    }
  }, [dispatch, genresLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <div className="navbar">
        <TopNav isScrolled={isScrolled} />
      </div>
      <div className="hero">
        <img
          className="background-image"
          src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668267540/NetflixApp/avengers-age-of-ultron-team-together-poster-wallpaper-1600x600-92751_84_qvwbif.jpg"
          alt="hero movies"
        />
        <div className="container">
          <div className="title">
            <h1>Featured Movies</h1>
            <p>
              Explore our vast collection of award-winning films, blockbuster releases,
              and timeless cinema classics. Stream anytime, anywhere.
            </p>
          </div>
          <div className="buttons">
            <button onClick={() => navigate("/player")} className="playBtn">
              Play
            </button>
            <button className="moreBtn" onClick={() => navigate("/player")}>
              More Info
            </button>
          </div>
        </div>
      </div>
      <div className="data">
        <SliderContainer movies={movies} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .hero {
    position: relative;
    .background-image {
      filter: brightness(40%);
      height: 70vh;
      width: 100%;
      object-fit: cover;
    }
    .container {
      position: absolute;
      bottom: 2rem;
      .title {
        h1 {
          margin-left: 5rem;
          text-transform: uppercase;
          font-size: 55px;
          background: -webkit-linear-gradient(#eee, rgb(128, 13, 13));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          width: 640px;
          margin-left: 5rem;
          font-family: "lexend Deca", sans-serif;
          color: white;
          margin-top: 1rem;
        }
      }
      .buttons {
        display: flex;
        margin: 2rem 5rem;
        gap: 2rem;

        .playBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          color: red;
          background-color: white;
          border-radius: 0.5rem;
          font-size: 1.2rem;
          padding: 0.7rem 2rem;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
        }
        .moreBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background-color: rgba(109, 109, 110, 0.7);
          border-radius: 0.5rem;
          font-size: 1.2rem;
          padding: 0.7rem 2rem;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: 0.2s ease-in-out;
          &:hover {
            background-color: rgba(109, 109, 110, 0.4);
          }
        }
      }
    }
  }
`;

export default MoviePage;
