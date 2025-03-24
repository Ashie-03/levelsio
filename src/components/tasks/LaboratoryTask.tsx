// components/tasks/LaboratoryTask.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tasks.css';

const LaboratoryTask = ({ onComplete, onReturn }) => {
  const [elements, setElements] = useState([
    { id: 1, name: 'Hydrogen', symbol: 'H', selected: false },
    { id: 2, name: 'Oxygen', symbol: 'O', selected: false },
    { id: 3, name: 'Carbon', symbol: 'C', selected: false },
    { id: 4, name: 'Nitrogen', symbol: 'N', selected: false }
  ]);
  
  const [formula, setFormula] = useState([]);
  const [targetFormula, setTargetFormula] = useState('H2O');
  const [message, setMessage] = useState('Create H2O (water) by selecting elements');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  
  const handleElementClick = (element) => {
    if (completed) return;
    
    setFormula([...formula, element.symbol]);
  };
  
  const handleClear = () => {
    setFormula([]);
    setMessage('Create H2O (water) by selecting elements');
  };
  
  const handleSubmit = () => {
    const currentFormula = formula.join('');
    
    if (currentFormula === 'H2O' || currentFormula === 'HOH' || currentFormula === 'OH2') {
      setMessage('Success! You created water.');
      setCompleted(true);
      setTimeout(() => {
        onComplete();
        navigate('/jury-list');
      }, 2000);
    } else {
      setMessage('Incorrect formula. Try again.');
      setTimeout(() => {
        setFormula([]);
        setMessage('Create H2O (water) by selecting elements');
      }, 1500);
    }
  };
  
  return (
    <div className="task-container laboratory-task">
      <h2>LABORATORY ANALYSIS</h2>
      <p>{message}</p>
      
      <div className="formula-display">
        {formula.length > 0 ? formula.join('') : 'Select elements below'}
      </div>
      
      <div className="elements-grid">
        {elements.map(element => (
          <div 
            key={element.id}
            className={`element ${element.selected ? 'selected' : ''}`}
            onClick={() => handleElementClick(element)}
          >
            <div className="element-symbol">{element.symbol}</div>
            <div className="element-name">{element.name}</div>
          </div>
        ))}
        
        <div className="element number" onClick={() => handleElementClick({ symbol: '2' })}>
          <div className="element-symbol">2</div>
        </div>
      </div>
      
      <div className="task-buttons">
        <button onClick={handleClear} disabled={completed}>Clear</button>
        <button onClick={handleSubmit} disabled={completed || formula.length === 0}>
          Test Formula
        </button>
      </div>
      
      {completed && <div className="task-complete">Formula Verified!</div>}
      
      <button className="return-button" onClick={onReturn}>
        Return to Ship
      </button>
    </div>
  );
};
