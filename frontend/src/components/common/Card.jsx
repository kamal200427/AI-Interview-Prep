import React from "react";
import "./commonTool.css";

const Card = ({
  title,
  subtitle,
  icon,
  action,
  className = "",
  children,
  style = {},
}) => {
  return (
    <div
      className={`dashboard-card ${className}`}
      style={style}
    >
      {(title || subtitle || icon || action) && (
        <div className="dashboard-card-header">
          <div className="dashboard-card-title-group">
            {icon && (
              <div className="dashboard-card-icon">
                {icon}
              </div>
            )}

            <div>
              {title && (
                <h3 className="dashboard-card-title">
                  {title}
                </h3>
              )}

              {subtitle && (
                <p className="dashboard-card-subtitle">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {action && (
            <div className="dashboard-card-action">
              {action}
            </div>
          )}
        </div>
      )}

      <div className="dashboard-card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;