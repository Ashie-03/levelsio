import React from 'react';
import './MapOverlay.css';

const MapOverlay = ({ show, onToggle, tasks, currentArea }) => {
  return (
    <div className="map-container">
      <button className="map-toggle" onClick={onToggle}>
        {show ? 'HIDE MAP' : 'SHOW MAP'}
      </button>
      
      {show && (
        <div className="map-overlay">
          <h3>SPACE STATION MAP</h3>
          <div className="map-grid">
            <div className={`map-area ${currentArea === 'electrical' ? 'current' : ''} ${tasks.electrical.completed ? 'completed' : ''}`}>
              ELECTRICAL
            </div>
            <div className={`map-area ${currentArea === 'laboratory' ? 'current' : ''} ${tasks.laboratory.completed ? 'completed' : ''}`}>
              LABORATORY
            </div>
            <div className={`map-area ${currentArea === 'zeroGravity' ? 'current' : ''} ${tasks.zeroGravity.completed ? 'completed' : ''}`}>
              ZERO-G
            </div>
            <div className={`map-area ${currentArea === 'oxygen' ? 'current' : ''} ${tasks.oxygen.completed ? 'completed' : ''}`}>
              OXYGEN
            </div>
            <div className="map-area central">
              CENTRAL
            </div>
          </div>
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-color current"></div>
              <span>Current Location</span>
            </div>
            <div className="legend-item">
              <div className="legend-color completed"></div>
              <span>Completed</span>
            </div>
            <div className="legend-item">
              <div className="legend-color"></div>
              <span>Incomplete</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};