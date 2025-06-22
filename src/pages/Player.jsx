import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PlayContainer>
        <div className="player">
          <div className="backArrow">
            <BsArrowLeft onClick={() => navigate(-1)} />
          </div>
            <video src="https://res.cloudinary.com/ehizeex-shop/video/upload/v1668377666/NetflixApp/Action_mlw9wx.mp4" loop controls/>
        </div>
      </PlayContainer>
    </div>
  );
};

const PlayContainer = styled.div`
  .player{
    width: 100vw;
    height: 100vh;
    .backArrow{
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg{
        font-size: 3rem;
        cursor: pointer;
        color: white;
      }
    }
    video{
      height: 100%;
      width: 100%;
    }
  }
`;

export default Player;
