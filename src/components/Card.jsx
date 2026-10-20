import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";

export default React.memo(function Card({ movieData }) {
  const [onHovered, setOnHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isAdded, setIsAdded] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("netflix_my_list") || "[]");
      return saved.some((m) => m.id === movieData?.id);
    } catch {
      return false;
    }
  });

  const navigate = useNavigate();

  const toggleList = (e) => {
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem("netflix_my_list") || "[]");
      let updated;
      if (isAdded) {
        updated = saved.filter((m) => m.id !== movieData.id);
        setIsAdded(false);
      } else {
        updated = [...saved, movieData];
        setIsAdded(true);
      }
      localStorage.setItem("netflix_my_list", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage_my_list"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    if (!isLiked) setIsDisliked(false);
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    setIsDisliked((prev) => !prev);
    if (!isDisliked) setIsLiked(false);
  };

  if (!movieData) return null;

  return (
    <CardContainer
      onMouseEnter={() => setOnHovered(true)}
      onMouseLeave={() => setOnHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt={movieData.name || "movie poster"}
        onClick={() => navigate("/player")}
      />
      {onHovered && (
        <div className="hover">
          <div className="image-video-wrapper">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt={movieData.name || "movie poster"}
              onClick={() => navigate("/player")}
            />
            <video
              src="https://res.cloudinary.com/ehizeex-shop/video/upload/v1668377666/NetflixApp/Action_mlw9wx.mp4"
              loop
              controls
            />
          </div>
          <div className="info-container">
            <h3 className="movieName" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons">
              <div className="controls">
                <IoPlayCircleSharp
                  title="play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill
                  title="like"
                  onClick={handleLike}
                  className={isLiked ? "active-icon" : ""}
                />
                <RiThumbDownFill
                  title="dislike"
                  onClick={handleDislike}
                  className={isDisliked ? "active-icon" : ""}
                />
                {isAdded ? (
                  <BsCheck
                    title="Remove from My List"
                    onClick={toggleList}
                    className="active-icon"
                  />
                ) : (
                  <AiOutlinePlus
                    title="Add to My List"
                    onClick={toggleList}
                  />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" onClick={() => navigate("/player")} />
              </div>
            </div>
            <div className="genres">
              <ul>
                {movieData.genres?.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </CardContainer>
  );
});

const CardContainer = styled.div`
  margin-top: 1rem;
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;


  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;

  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.2rem;
    border: 0.1rem solid gray;
    background-color: #181818;
    transition: 0.3s ease-out;
    .image-video-wrapper {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        left: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        left: 0;
        z-index: 4;
        position: absolute;
      }
    }
    .info-container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.5rem;
      .movieName {
        color: white;
      }
    }
    .icons {
      display: flex;
      justify-content: space-between;
      .controls {
        display: flex;
        gap: 0.5rem;
      }

      svg {
        color: white;
        border: 0.1rem solid white;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
        &.active-icon {
          color: #e50914;
          border-color: #e50914;
        }
      }
    }
    .genres {
      display: flex;
      color: white;
      ul {
        display: flex;
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
