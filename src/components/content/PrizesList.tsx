// components/content/PrizesList.jsx
import React from 'react';
import './Content.css';

const PrizesList = ({ onReturn }) => {
  const prizes = [
    {
      tier: "GOLD",
      title: "Elite Space Explorer",
      requirements: "Complete all tasks with perfect scores",
      reward: "Custom mission patch and certificate of excellence"
    },
    {
      tier: "SILVER",
      title: "Veteran Astronaut",
      requirements: "Complete all tasks within time limits",
      reward: "Digital badge and mission completion certificate"
    },
    {
      tier: "BRONZE",
      title: "Space Cadet",
      requirements: "Complete at least 3 tasks",
      reward: "Mission participant certificate"
    }
  ];

  return (
    <div className="content-container prizes-list">
      <h2>MISSION REWARDS</h2>
      <p className="intro-text">Complete your mission to earn these prestigious rewards:</p>
      
      <div className="prizes">
        {prizes.map((prize, index) => (
          <div key={index} className={`prize-card ${prize.tier.toLowerCase()}`}>
            <div className="prize-tier">{prize.tier}</div>
            <h3>{prize.title}</h3>
            <div className="prize-requirements">
              <h4>Requirements:</h4>
              <p>{prize.requirements}</p>
            </div>
            <div className="prize-reward">
              <h4>Reward:</h4>
              <p>{prize.reward}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="note-card">
        <h3>MISSION STATUS</h3>
        <p>Continue completing your remaining tasks to achieve the highest possible reward tier!</p>
      </div>
      
      <button className="return-button" onClick={onReturn}>
        Return to Ship
      </button>
    </div>
  );
};