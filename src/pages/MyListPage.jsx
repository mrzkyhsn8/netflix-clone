import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Card from "../components/Card";

const MyListPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [myList, setMyList] = useState([]);
  const navigate = useNavigate();

  const loadList = () => {
    try {
      const items = JSON.parse(localStorage.getItem("netflix_my_list") || "[]");
      setMyList(items);
    } catch {
      setMyList([]);
    }
  };

  useEffect(() => {
    loadList();
    window.addEventListener("storage_my_list", loadList);
    return () => window.removeEventListener("storage_my_list", loadList);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <TopNav isScrolled={isScrolled} />
      <div className="content">
        <h1>My List</h1>
        {myList.length === 0 ? (
          <div className="empty-state">
            <p>You haven't added any movies or TV shows to your list yet.</p>
            <button onClick={() => navigate("/")}>Explore Movies</button>
          </div>
        ) : (
          <div className="grid">
            {myList.map((movie) => (
              <Card movieData={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: black;
  color: white;

  .content {
    padding: 7rem 4rem 4rem 4rem;
    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 6rem;
      gap: 1.5rem;
      color: #aaa;
      font-size: 1.2rem;
      button {
        padding: 0.8rem 2rem;
        background-color: red;
        color: white;
        border: none;
        border-radius: 0.4rem;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          background-color: #b81d24;
        }
      }
    }
  }
`;

export default MyListPage;
