import React from "react";

const Spinner = ({ classname, width = 32, height = 32, color = "#fff" }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width={width}
        height={height}
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "transparent",
        }}
      >
        <g>
          <circle
            strokeLinecap="round"
            fill="none"
            strokeDasharray="50.26548245743669 50.26548245743669"
            stroke={color}
            strokeWidth="8"
            r="32"
            cy="50"
            cx="50"
          >
            <animateTransform
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              dur="1s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
