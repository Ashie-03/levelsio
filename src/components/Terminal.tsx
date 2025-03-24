import React, { useState, useEffect } from 'react';
import './Terminal.css';

const Terminal = ({ onLaunchComplete }) => {
  const [leverPulled, setLeverPulled] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [launchSequence, setLaunchSequence] = useState(false);
  const [blackout, setBlackout] = useState(false);

  const handleLeverPull = () => {
    setLeverPulled(true);
    setLaunchSequence(true);
  };

  useEffect(() => {
    if (launchSequence && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (launchSequence && countdown === 0) {
      setBlackout(true);
      const transitionTimer = setTimeout(() => {
        onLaunchComplete();
      }, 2000);
      return () => clearTimeout(transitionTimer);
    }
  }, [launchSequence, countdown, onLaunchComplete]);

  return (
    <div className={`terminal-container ${blackout ? 'blackout' : ''}`}>
      <div className="terminal-content">
        <div className="terminal-header">
          <h2>MISSION CONTROL TERMINAL</h2>
          <div className="status-lights">
            <div className={`status-light ${launchSequence ? 'red' : 'green'}`}></div>
            <div className={`status-light ${countdown < 4 ? 'red' : 'green'}`}></div>
            <div className={`status-light ${countdown < 2 ? 'red' : 'green'}`}></div>
          </div>
        </div>
        
        <div className="terminal-display">
          {!leverPulled ? (
            <p>PULL LEVER TO INITIATE LAUNCH SEQUENCE</p>
          ) : (
            <p>COUNTDOWN: T-MINUS {countdown}</p>
          )}
          
          {countdown === 0 && <p>LAUNCH INITIATED!</p>}
        </div>
        
        <div className="launch-lever-container">
          <div 
            className={`launch-lever ${leverPulled ? 'pulled' : ''}`}
            onClick={!leverPulled ? handleLeverPull : undefined}
          >
            <div className="lever-handle"></div>
            <div className="lever-base"></div>
          </div>
          <span>LAUNCH</span>
        </div>
      </div>
    </div>
  );
};