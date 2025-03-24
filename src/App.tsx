// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Intro from './components/Intro';
import Terminal from './components/Terminal';
import SpaceShip from './components/SpaceShip';
import MapOverlay from './components/MapOverlay';
import ElectricalTask from './components/tasks/ElectricalTask';
import LaboratoryTask from './components/tasks/LaboratoryTask';
import ZeroGravityTask from './components/tasks/ZeroGravityTask';
import OxygenTask from './components/tasks/OxygenTask';
import GameRules from './components/content/GameRules';
import JuryList from './components/content/JuryList';
import PrizesList from './components/content/PrizesList';
import './App.css';

function App() {
  const [gameState, setGameState] = useState({
    currentStage: 'intro', // intro, terminal, spaceship
    launchComplete: false,
    tasks: {
      electrical: { completed: false },
      laboratory: { completed: false },
      zeroGravity: { completed: false },
      oxygen: { completed: false }
    },
    playerPosition: { x: 300, y: 300 },
    currentArea: null,
    showMap: false
  });

  const updateGameState = (updates) => {
    setGameState(prevState => ({
      ...prevState,
      ...updates
    }));
  };

  const updateTaskStatus = (taskName, completed) => {
    setGameState(prevState => ({
      ...prevState,
      tasks: {
        ...prevState.tasks,
        [taskName]: { 
          ...prevState.tasks[taskName],
          completed 
        }
      }
    }));
  };

  // Check if all tasks are completed
  useEffect(() => {
    const allTasksCompleted = Object.values(gameState.tasks).every(task => task.completed);
    if (allTasksCompleted) {
      // You could trigger game completion here
      console.log("All tasks completed! Mission success!");
    }
  }, [gameState.tasks]);

  const renderContent = () => {
    switch (gameState.currentStage) {
      case 'intro':
        return <Intro onComplete={() => updateGameState({ currentStage: 'terminal' })} />;
      case 'terminal':
        return <Terminal 
          onLaunchComplete={() => updateGameState({ currentStage: 'spaceship', launchComplete: true })} 
        />;
      case 'spaceship':
        return (
          <>
            <MapOverlay 
              show={gameState.showMap} 
              onToggle={() => updateGameState({ showMap: !gameState.showMap })}
              tasks={gameState.tasks}
              currentArea={gameState.currentArea}
            />
            <SpaceShip 
              gameState={gameState}
              updateGameState={updateGameState}
              updateTaskStatus={updateTaskStatus}
            />
          </>
        );
      default:
        return <div>Error: Unknown game stage</div>;
    }
  };

  return (
    <Router>
      <div className="game-container">
        <Routes>
          <Route path="/" element={renderContent()} />
          <Route path="/electrical-task" element={
            <ElectricalTask 
              onComplete={() => updateTaskStatus('electrical', true)} 
              onReturn={() => updateGameState({ currentArea: null })}
            />
          } />
          <Route path="/laboratory-task" element={
            <LaboratoryTask 
              onComplete={() => updateTaskStatus('laboratory', true)} 
              onReturn={() => updateGameState({ currentArea: null })}
            />
          } />
          <Route path="/zero-gravity-task" element={
            <ZeroGravityTask 
              onComplete={() => updateTaskStatus('zeroGravity', true)} 
              onReturn={() => updateGameState({ currentArea: null })}
            />
          } />
          <Route path="/oxygen-task" element={
            <OxygenTask 
              onComplete={() => updateTaskStatus('oxygen', true)} 
              onReturn={() => updateGameState({ currentArea: null })}
            />
          } />
          <Route path="/game-rules" element={
            <GameRules onReturn={() => updateGameState({ currentArea: null })} />
          } />
          <Route path="/jury-list" element={
            <JuryList onReturn={() => updateGameState({ currentArea: null })} />
          } />
          <Route path="/prizes-list" element={
            <PrizesList onReturn={() => updateGameState({ currentArea: null })} />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;