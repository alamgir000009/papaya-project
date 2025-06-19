import { useSelector } from "react-redux";
import styles from "./CustomInput.module.css";
const CustomTextArea = ({
    onChange = () => {},
    value,
    name,
    className = "",
    id,
    rows = 3,
    type = "text",
    placeholder = "",
    error,
    disabled = false,
    style,
    ...props
}) => {
    const theme = useSelector((state) => state.default.theme);
    return (
        <>
            <textarea
                type={type}
                id={id}
                name={name}
                className={`${styles.custom_input} ${className} ${
                    theme === "light" ? "" : styles.custom_dark_input
                }
                } ${error ? "error-input" : ""} ${
                    disabled
                        ? theme == "light"
                            ? "bg-gray-200"
                            : styles.custom_dark_input_disable
                        : ""
                } font-Inter`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                style={style}
                rows={rows}
                {...props}
            ></textarea>
            {error && (
                <div className="text-sm text-red-600 font-Inter py-1">
                    {" "}
                    {error}
                </div>
            )}
        </>
    );
};

export default CustomTextArea;
