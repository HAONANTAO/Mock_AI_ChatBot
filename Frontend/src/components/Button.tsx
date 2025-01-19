import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button data-testid="custom-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
