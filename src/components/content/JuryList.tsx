// components/content/JuryList.jsx
import React from 'react';
import './Content.css';

const JuryList = ({ onReturn }) => {
  const juryMembers = [
    {
      name: "Captain Alex Vega",
      role: "Mission Commander",
      description: "25 years of space exploration experience. Will evaluate mission efficiency."
    },
    {
      name: "Dr. Elena Chen",
      role: "Chief Scientist",
      description: "Specialist in exobiology and spacecraft systems. Will judge scientific approach."
    },
    {
      name: "Commander Tyrell Jones",
      role: "Safety Officer",
      description: "Former astronaut with expertise in crisis management. Will assess adherence to protocols."
    },
    {
      name: "Specialist Maya Rodriguez",
      role: "Technical Expert",
      description: "Spacecraft engineer with focus on electrical systems. Will evaluate technical solutions."
    },
    {
      name: "Dr. James Kim",
      role: "Psychological Advisor",
      description: "Space psychology expert. Will assess decision-making under pressure."
    }
  ];

  return (
    <div className="content-container jury-list">
      <h2>MISSION EVALUATION JURY</h2>
      <p className="intro-text">Your performance will be evaluated by these space mission experts:</p>
      
      <div className="jury-members">
        {juryMembers.map((member, index) => (
          <div key={index} className="jury-member">
            <h3>{member.name}</h3>
            <div className="role">{member.role}</div>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
      
      <div className="note-card">
        <h3>IMPORTANT NOTE</h3>
        <p>The jury will evaluate your mission based on task completion speed, efficiency, and problem-solving approach. Complete all tasks to maximize your mission rating.</p>
      </div>
      
      <button className="return-button" onClick={onReturn}>
        Return to Ship
      </button>
    </div>
  );
};