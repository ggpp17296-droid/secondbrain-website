import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-gradient-to-br from-primary to-primary-light text-white hover:-translate-y-0.5 hover:shadow-primary active:translate-y-0",
    secondary:
      "border border-border-default bg-dark-elevated text-text-primary hover:border-border-strong hover:bg-dark-hover",
    ghost:
      "text-text-secondary hover:bg-dark-elevated hover:text-text-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
