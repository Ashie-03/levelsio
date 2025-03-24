import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tasks.css';

const ZeroGravityTask = ({ onComplete, onReturn }) => {
  const [coins, setCoins] = useState([]);
  const [hazards, setHazards] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const gameAreaRef = useRef(null);
  const navigate = useNavigate();
  
  const targetScore = 10;
  
  // Initialize game
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setCoins([]);
    setHazards([]);
    
    // Set initial coins and hazards
    generateItems();
  };
  
  // Generate coins and hazards
  const generateItems = () => {
    if (!gameAreaRef.current) return;
    
    const width = gameAreaRef.current.offsetWidth;
    const height = gameAreaRef.current.offsetHeight;
    
    // Generate coins
    const newCoins = Array.from({ length: 5 }, (_, i) => ({
      id: `coin-${Date.now()}-${i}`,
      x: Math.random() * (width - 40),
      y: Math.random() * (height - 40),
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
    }));
    
    // Generate hazards
    const newHazards = Array.from({ length: 3 }, (_, i) => ({
      id: `hazard-${Date.now()}-${i}`,
      x: Math.random() * (width - 40),
      y: Math.random() * (height - 40),
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5,
    }));
    
    setCoins(prev => [...prev, ...newCoins]);
    setHazards(prev => [...prev, ...newHazards]);
  };
  
  // Game timer
  useEffect(() => {
    if (!gameStarted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted]);
  
  // Check game over conditions
  useEffect(() => {
    if (score >= targetScore) {
      setCompleted(true);
      setGameStarted(false);
      setTimeout(() => {
        onComplete();
        navigate('/prizes-list');
      }, 2000);
    } else if (timeLeft === 0 && gameStarted) {
      setGameStarted(false);
    }
  }, [score, timeLeft, gameStarted, onComplete, navigate]);
  
  // Move items
  useEffect(() => {
    if (!gameStarted || !gameAreaRef.current) return;
    
    const width = gameAreaRef.current.offsetWidth;
    const height = gameAreaRef.current.offsetHeight;
    
    const moveInterval = setInterval(() => {
      // Move coins
      setCoins(prev => prev.map(coin => {
        let newX = coin.x + coin.vx;
        let newY = coin.y + coin.vy;
        
        // Bounce off walls
        if (newX < 0 || newX > width - 40) {
          coin.vx = -coin.vx;
          newX = coin.x + coin.vx;
        }
        
        if (newY < 0 || newY > height - 40) {
          coin.vy = -coin.vy;
          newY = coin.y + coin.vy;
        }
        
        return { ...coin, x: newX, y: newY };
      }));
      
      // Move hazards
      setHazards(prev => prev.map(hazard => {
        let newX = hazard.x + hazard.vx;
        let newY = hazard.y + hazard.vy;
        
        // Bounce off walls
        if (newX < 0 || newX > width - 40) {
          hazard.vx = -hazard.vx;
          newX = hazard.x + hazard.vx;
        }
        
        if (newY < 0 || newY > height - 40) {
          hazard.vy = -hazard.vy;
          newY = hazard.y + hazard.vy;
        }
        
        return { ...hazard, x: newX, y: newY };
      }));
    }, 50);
    
    return () => clearInterval(moveInterval);
  }, [gameStarted]);
  
  // Add more coins periodically
  useEffect(() => {
    if (!gameStarted) return;
    
    const coinInterval = setInterval(() => {
      if (coins.length < 8) {
        generateItems();
      }
    }, 3000);
    
    return () => clearInterval(coinInterval);
  }, [gameStarted, coins.length]);
  
  // Handle coin collection and hazard collision
  const handleItemClick = (itemId, type) => {
    if (!gameStarted) return;
    
    if (type === 'coin') {
      setScore(prev => prev + 1);
      setCoins(prev => prev.filter(coin => coin.id !== itemId));
    } else if (type === 'hazard') {
      // Penalize the player for clicking a hazard
      setScore(prev => Math.max(0, prev - 2));
    }
  };
  
  return (
    <div className="task-container zero-gravity-task">
      <h2>ZERO-GRAVITY COLLECTION</h2>
      
      {!gameStarted && !completed ? (
        <div className="game-start">
          <p>Collect space coins while avoiding sharp objects!</p>
          <p>Target: {targetScore} coins</p>
          <button onClick={startGame}>Start Mission</button>
        </div>
      ) : (
        <>
          <div className="game-stats">
            <div className="score">Coins: {score}/{targetScore}</div>
            <div className="time">Time: {timeLeft}s</div>
          </div>
          
          <div className="game-area" ref={gameAreaRef}>
            {coins.map(coin => (
              <div
                key={coin.id}
                className="coin"
                style={{ left: `${coin.x}px`, top: `${coin.y}px` }}
                onClick={() => handleItemClick(coin.id, 'coin')}
              ></div>
            ))}
            
            {hazards.map(hazard => (
              <div
                key={hazard.id}
                className="hazard"
                style={{ left: `${hazard.x}px`, top: `${hazard.y}px` }}
                onClick={() => handleItemClick(hazard.id, 'hazard')}
              ></div>
            ))}
          </div>
        </>
      )}
      
      {!gameStarted && timeLeft === 0 && !completed && (
        <div className="game-over">
          <p>Mission failed! You collected {score} coins.</p>
          <button onClick={startGame}>Try Again</button>
        </div>
      )}
      
      {completed && <div className="task-complete">Collection Complete!</div>}
      
      <button className="return-button" onClick={onReturn}>
        Return to Ship
      </button>
    </div>
  );
};