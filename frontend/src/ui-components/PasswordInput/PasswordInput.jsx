"use client";
import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import style from "./PasswordInput.module.css";
const PasswordInput = ({
  value,
  onChange,
  placeholder = "Enter password",
  error = false,
  className = "",
  id,
  name,
  inputClassName = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState("hide");
  const theme = "light";
  return (
    <>
      <div
        className={`flex ${style.custom_icon_input} ${className} ${
          error ? "error-input" : ""
        } ${theme == "light" ? "" : style.custom_icon_input_dark}`}
      >
        <input
          type={showPassword === "hide" ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          className={inputClassName}
          onChange={onChange}
          name={name}
          id={id}
          {...props}
        />
        <div className={`p-2 cursor-pointer ${style.custom_input_icon_box}`}>
          {showPassword == "show" ? (
            <RiEyeLine
              className="text-gray-700"
              onClick={() => {
                setShowPassword("hide");
              }}
            />
          ) : (
            <RiEyeOffLine
              className="text-gray-700"
              onClick={() => {
                setShowPassword("show");
              }}
            />
          )}
        </div>
      </div>
      {error && (
        <div className="text-sm text-red-600 font-Inter pt-1">{error}</div>
      )}
    </>
  );
};

export default PasswordInput;
