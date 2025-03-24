import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tasks.css';

const ElectricalTask = ({ onComplete, onReturn }) => {
  const [wires, setWires] = useState([
    { id: 1, color: 'red', connected: false, startY: 50 },
    { id: 2, color: 'blue', connected: false, startY: 100 },
    { id: 3, color: 'yellow', connected: false, startY: 150 },
    { id: 4, color: 'green', connected: false, startY: 200 }
  ]);
  
  const [selectedWire, setSelectedWire] = useState(null);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  
  const handleWireSelect = (wireId) => {
    if (!selectedWire) {
      setSelectedWire(wireId);
    } else if (selectedWire === wireId) {
      setSelectedWire(null);
    } else {
      // Connect the wires (same color matching)
      const wire1 = wires.find(w => w.id === selectedWire);
      const wire2 = wires.find(w => w.id === wireId);
      
      if (wire1.color === wire2.color) {
        setWires(wires.map(wire => 
          (wire.id === selectedWire || wire.id === wireId) 
            ? { ...wire, connected: true } 
            : wire
        ));
      }
      
      setSelectedWire(null);
    }
  };
  
  useEffect(() => {
    if (wires.every(wire => wire.connected)) {
      setCompleted(true);
      setTimeout(() => {
        onComplete();
        navigate('/game-rules');
      }, 1500);
    }
  }, [wires, onComplete, navigate]);
  
  return (
    <div className="task-container electrical-task">
      <h2>ELECTRICAL REPAIR</h2>
      <p>Connect matching colored wires to restore power</p>
      
      <div className="wire-board">
        <div className="wire-panel left">
          {wires.map(wire => (
            <div 
              key={`left-${wire.id}`}
              className={`wire ${wire.color} ${wire.connected ? 'connected' : ''} ${selectedWire === wire.id ? 'selected' : ''}`}
              style={{ top: `${wire.startY}px` }}
              onClick={() => !wire.connected && handleWireSelect(wire.id)}
            >
              <div className="wire-end"></div>
              <div className="wire-line"></div>
            </div>
          ))}
        </div>
        
        <div className="wire-panel right">
          {[...wires].sort(() => Math.random() - 0.5).map((wire, index) => (
            <div 
              key={`right-${wire.id}`}
              className={`wire ${wire.color} ${wire.connected ? 'connected' : ''} ${selectedWire === wire.id ? 'selected' : ''}`}
              style={{ top: `${50 + index * 50}px` }}
              onClick={() => !wire.connected && handleWireSelect(wire.id)}
            >
              <div className="wire-line"></div>
              <div className="wire-end"></div>
            </div>
          ))}
        </div>
      </div>
      
      {completed && <div className="task-complete">Power Restored!</div>}
      
      <button className="return-button" onClick={onReturn}>
        Return to Ship
      </button>
    </div>
  );
};