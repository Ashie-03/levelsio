import React, { useState, useEffect } from 'react';
import './Intro.css';

const Intro = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [storyComplete, setStoryComplete] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const fullStory = "Welcome to Vibe Mission. Earth needs your help. You've been selected for a critical mission to explore an abandoned space station. Suit up, complete your tasks, and return safely. The fate of humanity rests in your hands.";
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullStory.length) {
        setTypedText(fullStory.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setStoryComplete(true);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, []);

  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(onComplete, 1000);
  };

  return (
    <div className={`intro-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="intro-content">
        <h1>VIBE MISSION</h1>
        <div className="story-text">
          {typedText}
        </div>
        {storyComplete && (
          <button className="suit-up-button" onClick={handleContinue}>
            SUIT UP
          </button>
        )}
      </div>
    </div>
  );
};