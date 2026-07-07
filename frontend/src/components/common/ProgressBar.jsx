import React from "react";
import "./commonTool.css";

const ProgressBar = ({
  label = "",
  value = 0,
  color = "#3b82f6",
  height = "10px",
  showPercentage = true,
  className = "",
}) => {
  return (
    <div className={`progress-item ${className}`}>
      {(label || showPercentage) && (
        <div className="progress-header">
          {label && (
            <span className="progress-label">
              {label}
            </span>
          )}

          {showPercentage && (
            <span className="progress-value">
              {value}%
            </span>
          )}
        </div>
      )}

      <div
        className="progress-track"
        style={{ height }}
      >
        <div
          className="progress-fill"
          style={{
            width: `${value}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;