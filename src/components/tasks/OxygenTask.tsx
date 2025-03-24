// components/tasks/OxygenTask.jsx
import React, { useState } from 'react';
import './Tasks.css';

const OxygenTask = ({ onComplete, onReturn }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    experience: 'beginner'
  });
  const [showEmergency, setShowEmergency] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
      
      // Redirect to Google Forms
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSfnL3DLzu7LxJ1fVDBUxXqj8AM9LCZLCrV5eDyTHF9X5339sA/viewform', '_blank');
      
      onReturn();
    }, 1500);
  };
  
  return (
    <div className="task-container oxygen-task">
      {showEmergency && (
        <div className="emergency-alert">
          <h2>⚠️ EMERGENCY ALERT ⚠️</h2>
          <p>Oxygen levels critical! Register in the system to activate backup oxygen supply.</p>
          <button onClick={() => setShowEmergency(false)}>Acknowledge</button>
        </div>
      )}
      
      <h2>OXYGEN SYSTEM REGISTRATION</h2>
      
      <form className="oxygen-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Space Traveler Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Earth Contact Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="experience">Space Experience:</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        
        <button type="submit" className="fix-oxygen-button" disabled={isSubmitting}>
          {isSubmitting ? 'Fixing Oxygen...' : 'Fix Oxygen System'}
        </button>
      </form>
      
      <button className="return-button" onClick={onReturn}>
        Return to Ship
      </button>
    </div>
  );
};