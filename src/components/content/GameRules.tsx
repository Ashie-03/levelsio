import React from 'react';
import './Content.css';

const GameRules = ({ onReturn }) => {
  return (
    <div className="content-container game-rules">
      <h2>VIBE MISSION: GAME RULES</h2>
      
      <div className="rule-card">
        <h3>MISSION OBJECTIVE</h3>
        <p>Complete all tasks in the space station to ensure safe return to Earth. Navigate through different areas and solve challenges.</p>
      </div>
      
      <div className="rule-card">
        <h3>GAMEPLAY</h3>
        <ul>
          <li>Use arrow keys or touch/drag to move your character</li>
          <li>Approach any of the 4 stations to interact with them</li>
          <li>Complete all tasks to finish the mission</li>
          <li>Use the map for navigation assistance</li>
        </ul>
      </div>
      
      <div className="rule-card">
        <h3>AREAS & TASKS</h3>
        <ol>
          <li><strong>Electrical:</strong> Connect matching colored wires</li>
          <li><strong>Laboratory:</strong> Create the correct chemical formula</li>
          <li><strong>Zero-Gravity Zone:</strong> Collect floating coins while avoiding hazards</li>
          <li><strong>Oxygen:</strong> Register to fix the oxygen system</li>
        </ol>
      </div>
      
      <div className="rule-card">
        <h3>TIPS</h3>
        <p>Check the map frequently to see which tasks you've completed. Each completed task reveals important mission information.</p>
      </div>
      
      <button className="return-button" onClick={onReturn}>
        Return to Ship
      </button>
    </div>
  );
};
