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
  const [selectedProfileIndex, setselectedProfileIndex] = useState(null);
  const containerRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("https://randomuser.me/api/?results=9");
        const userData = await response.json();
        setAllUsers(userData.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    const storedActiveProfile = localStorage.getItem("activeProfile");
    const storedselectedProfileIndex = localStorage.getItem("selectedProfileIndex");

    if (storedActiveProfile && storedselectedProfileIndex !== null) {
      const parsedProfile = JSON.parse(storedActiveProfile);
      setActiveProfile(parsedProfile);
      setselectedProfileIndex(parseInt(storedselectedProfileIndex));
      setUsers([parsedProfile]);
    } else {
      setUsers(allUsers);
    }
  }, [allUsers]);

  useEffect(() => {
    if (activeProfile !== null && selectedProfileIndex !== null) {
      localStorage.setItem("activeProfile", JSON.stringify(activeProfile));
      localStorage.setItem("selectedProfileIndex", selectedProfileIndex.toString());
    }
  }, [activeProfile, selectedProfileIndex]);

  useEffect(() => {
    if (selectedProfileIndex !== null && containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth;
      const containerWidth = containerRef.current.scrollWidth;
      const cardOffset = selectedProfileIndex * cardWidth;
      const targetScroll = cardOffset - (containerWidth - cardWidth) / 2;

      containerRef.current.scrollLeft = targetScroll;
    }
  }, [selectedProfileIndex, containerRef]);

 

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

  const handleCardClick = (user, index) => {
    setActiveProfile(user);
    setselectedProfileIndex(index);
    setUsers([user]);
  };
  const showAllCards = () => {
    setActiveProfile(null);
    setselectedProfileIndex(null);
    setUsers(allUsers);
  };

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += containerRef.current.offsetWidth;
  };

  return users.length=== 0?(<Shimmer />) : (
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
          <button className="search-button" onClick={filterCards}>
            Search
          </button>
          <button className="show-all-button" onClick={showAllCards}>
            Show All Profiles
          </button>
        </div>
        <div className={`cards-container ${selectedProfileIndex !== null ? "centered" : ""}`} ref={containerRef}>
          {users.map((user, index) => (
            <div
              key={index}
              className={`profile-card ${selectedProfileIndex === index ? "active" : ""}`}
            >
              <SocialCard
                userData={user}
                activeProfile={activeProfile}
                onClick={() => handleCardClick(user, index)}
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
