import React from "react";

// Card component
const Card = ({ children, className = "", style }) => {
  return (
    <div
      className={`shadow-sm  border-[3px] border-black rounded-3xl bg-[#e1dbd5] overflow-hidden  ${className} font-gilmer text-black`}
      style={style}
    >
      {children}
    </div>
  );
};

Card.Title = ({ children, className = "" }) => {
  return (
    <div
      className={`!font-extrabold text-2xl px-4 py-3 border-b-2 border-secondary ${className} font-gilmer `}
    >
      {children}
    </div>
  );
};

Card.Body = ({ children, className = "" }) => {
  return <div className={`p-4 ${className} font-gilmer   `}>{children}</div>;
};

export default Card;
