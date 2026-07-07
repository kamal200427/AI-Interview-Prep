 import React from "react";
import "./commonTool.css";


const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  icon,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {icon && <span className="btn-icon">{icon}</span>}

      <span>{children}</span>
    </button>
  );
};

export default Button;