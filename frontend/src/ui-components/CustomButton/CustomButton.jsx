import React from "react";
import Spinner from "../Spinner/Spinner";

const CustomButton = ({
  children,
  disabled = false,
  onClick,
  className = "",
  type,
  onLoading,
  ...props
}) => {
  return (
    <button
      className={`bg-primary rounded-full p-2  w-full  text-white hover:bg-secondary flex justify-center items-center font-gilmer text-lg font-normal ${
        onLoading || disabled ? "opacity-50  cursor-not-allowed" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {onLoading ? <Spinner color="white" width={24} height={24} /> : children}
    </button>
  );
};

export default CustomButton;
