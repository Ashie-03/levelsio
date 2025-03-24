// components/SpaceShip.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SpaceShip.css';

const SpaceShip = ({ gameState, updateGameState, updateTaskStatus }) => {
  const [showNotification, setShowNotification] = useState(true);
  const [playerPosition, setPlayerPosition] = useState({ x: 300, y: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const spaceshipRef = useRef(null);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  
  const SPEED = 5;
  
  // Areas in the spaceship with their positions and sizes
  const areas = {
    electrical: { x: 100, y: 100, width: 120, height: 100, label: 'Electrical' },
    laboratory: { x: 500, y: 100, width: 120, height: 100, label: 'Laboratory' },
    zeroGravity: { x: 500, y: 400, width: 120, height: 100, label: 'Zero-G Zone' },
    oxygen: { x: 100, y: 400, width: 120, height: 100, label: 'Oxygen' },
  };

  useEffect(() => {
    // Display welcome notification for 5 seconds
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  useEffect(() => {
    // Keyboard controls for player movement
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
          setPlayerPosition(prev => ({ 
            ...prev, 
            y: Math.max(30, prev.y - SPEED) 
          }));
          break;
        case 'ArrowDown':
          setPlayerPosition(prev => ({ 
            ...prev, 
            y: Math.min(spaceshipRef.current.offsetHeight - 30, prev.y + SPEED) 
          }));
          break;
        case 'ArrowLeft':
          setPlayerPosition(prev => ({ 
            ...prev, 
            x: Math.max(30, prev.x - SPEED) 
          }));
          break;
        case 'ArrowRight':
          setPlayerPosition(prev => ({ 
            ...prev, 
            x: Math.min(spaceshipRef.current.offsetWidth - 30, prev.x + SPEED) 
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch and drag controls for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setTouchPosition({ 
      x: touch.clientX, 
      y: touch.clientY 
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchPosition.x;
    const deltaY = touch.clientY - touchPosition.y;
    
    setTouchPosition({ 
      x: touch.clientX, 
      y: touch.clientY 
    });
    
    setPlayerPosition(prev => ({
      x: Math.min(Math.max(30, prev.x + deltaX), spaceshipRef.current.offsetWidth - 30),
      y: Math.min(Math.max(30, prev.y + deltaY), spaceshipRef.current.offsetHeight - 30)
    }));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Check if player is in an interactive area
  useEffect(() => {
    // Check if the player is in an area
    let currentArea = null;
    
    Object.entries(areas).forEach(([areaKey, area]) => {
      if (
        playerPosition.x > area.x && 
        playerPosition.x < area.x + area.width &&
        playerPosition.y > area.y && 
        playerPosition.y < area.y + area.height
      ) {
        currentArea = areaKey;
      }
    });
    
    updateGameState({ currentArea });
  }, [playerPosition, updateGameState]);

  const handleInteraction = () => {
    const { currentArea } = gameState;
    if (!currentArea) return;
    
    // Handle area-specific navigation
    switch(currentArea) {
      case 'electrical':
        navigate('/electrical-task');
        break;
      case 'laboratory':
        navigate('/laboratory-task');
        break;
      case 'zeroGravity':
        navigate('/zero-gravity-task');
        break;
      case 'oxygen':
        navigate('/oxygen-task');
        break;
      default:
        break;
    }
  };

  // Render after-task content
  const getTaskCompletionNavigation = (taskName) => {
    switch(taskName) {
      case 'electrical':
        return '/game-rules';
      case 'laboratory':
        return '/jury-list';
      case 'zeroGravity':
        return '/prizes-list';
      default:
        return null;
    }
  };

  useEffect(() => {
    // Check for task completion and show appropriate content
    Object.entries(gameState.tasks).forEach(([taskName, taskState]) => {
      if (taskState.completed) {
        const navPath = getTaskCompletionNavigation(taskName);
        if (navPath) {
          navigate(navPath);
        }
      }
    });
  }, [gameState.tasks, navigate]);

  return (
    <div 
      className="spaceship-container" 
      ref={spaceshipRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {showNotification && (
        <div className="notification">
          <h3>TRANSMISSION RECEIVED</h3>
          <p>Congrats on landing safely. Complete your missions to come back to Earth. You can see a map on the top to help you navigate. Happy Vibe Mission!</p>
        </div>
      )}
      
      {/* Render the areas */}
      {Object.entries(areas).map(([key, area]) => (
        <div 
          key={key}
          className={`area ${key} ${gameState.tasks[key].completed ? 'completed' : ''} ${gameState.currentArea === key ? 'active' : ''}`}
          style={{
            left: `${area.x}px`,
            top: `${area.y}px`,
            width: `${area.width}px`,
            height: `${area.height}px`
          }}
        >
          <div className="area-label">{area.label}</div>
        </div>
      ))}
      
      {/* Player character */}
      <div 
        ref={playerRef}
        className="player"
        style={{
          left: `${playerPosition.x}px`,
          top: `${playerPosition.y}px`
        }}
        onClick={handleInteraction}
      >
        <div className="player-avatar"></div>
      </div>
      
      {/* Action button when in an area */}
      {gameState.currentArea && (
        <button className="interaction-button" onClick={handleInteraction}>
          {gameState.tasks[gameState.currentArea].completed 
            ? 'VIEW INFO' 
            : `START ${areas[gameState.currentArea].label.toUpperCase()} TASK`}
        </button>
      )}
    </div>
  );
};