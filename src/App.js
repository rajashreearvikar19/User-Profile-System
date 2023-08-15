import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SocialCard from "./components/SocialCard";
import Header from "./components/Header";
import { MdArrowBack, MdArrowForward } from "react-icons/md"; 
import Shimmer from "./components/Shimmer";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);
  const containerRef = useRef(null);
  const [searchValue, setSearchValue] = useState(""); 

  useEffect(() => {
    (async () => {
      let userData;
      try {
        const response = await fetch("https://randomuser.me/api/?results=9"); 
        userData = await response.json();
      } catch (error) {
        console.log(error);
        userData = [];
      }
      setAllUsers(userData.results);
      setUsers(userData.results);
    })();
  }, []);

  const filterCards = () => {
    if (activeProfile) {
      setUsers([activeProfile]);
    } else {
      const filteredUsers = allUsers.filter(user =>
        (`${user.name.first} ${user.name.last}`.toLowerCase().includes(searchValue.toLowerCase()))
      );
      setUsers(filteredUsers);
    }
  };

  const handleCardClick = user => {
    setActiveProfile(user);
    setUsers([user]);
  };

  const showAllCards = () => {
    setActiveProfile(null);
    setUsers(allUsers);
  };

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += containerRef.current.offsetWidth;
  };

  return users.length===0?(<Shimmer/>): (
    <div className="App">
      <Header />
      <div className="App-Body">
        <div className="search-section">
          <input
            className="search-box"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="🔍 search user..."
          />
          <button className="search-button" onClick={filterCards}>Search</button>
          <button className="show-all-button" onClick={showAllCards}>
            Show All Profiles
          </button>
        </div>
        <div className="cards-container" ref={containerRef}>
          {users.map((user, index) => (
            <div key={index} className="profile-card">
              <SocialCard
                userData={user}
                activeProfile={activeProfile}
                onClick={() => handleCardClick(user)}
              />
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <div className="scroll-button" onClick={scrollLeft}>
            <MdArrowBack />
          </div>
          <div className="scroll-button" onClick={scrollRight}>
            <MdArrowForward />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
