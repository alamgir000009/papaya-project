"use client";
import styles from "./CustomInput.module.css";

const CustomInput = ({
  onChange = () => {},
  value = "",
  name,
  className = "",
  id,
  type = "text",
  placeholder = "",
  error,
  disabled = false,
  style,
  ...props
}) => {
  const theme = "light";

  const inputValue =
    type === "color" && (!value || value === "") ? "#000000" : value || "";

  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        className={`${styles.custom_input} ${className} ${
          theme === "light" ? "" : styles.custom_dark_input
        }
                } ${error ? "error-input" : ""} ${
          disabled
            ? theme === "light"
              ? styles.custom_input_disable
              : styles.custom_dark_input_disable
            : ""
        } font-Inter`}
        value={inputValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={style}
        {...props}
      />
      {error && (
        <div className="text-sm text-red-600 font-Inter py-1">{error}</div>
      )}
    </>
  );
};

export default CustomInput;
