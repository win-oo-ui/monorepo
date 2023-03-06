import React from "react";

export interface ButtonProps {
  label: string;
  onClick?: (event: MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return <button className="wo-button__container">{label}</button>;
};

export default Button;
