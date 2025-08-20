import React from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-black border border-transparent focus:border-neon-pink",
  outlined: "border border-neon-blue focus:border-neon-green",
  ghost: "bg-transparent border border-transparent focus:border-neon-pink",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
}) => {
  const inputClass = [
    "rounded-md outline-none transition-colors w-full text-gray-200 bg-black",
    sizeClasses[size],
    variantClasses[variant],
    disabled ? "opacity-50 cursor-not-allowed" : "",
    invalid ? "border-neon-pink focus:border-neon-pink" : "",
    "focus:shadow-neon",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-neon-green">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid}
        className={inputClass}
      />
      {invalid && errorMessage ? (
        <span className="text-xs text-neon-pink">{errorMessage}</span>
      ) : helperText ? (
        <span className="text-xs text-neon-blue">{helperText}</span>
      ) : null}
    </div>
  );
};
