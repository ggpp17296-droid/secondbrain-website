import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({
  children,
  className = "",
  hover = true,
  glass = false,
}: CardProps) {
  const baseStyles = "rounded-card border transition-all duration-200 ease-out";
  const hoverStyles = hover ? "hover:-translate-y-1 hover:shadow-card-hover" : "";
  const surfaceStyles = glass
    ? "border-glass-border bg-glass-bg backdrop-blur-glass"
    : "border-border-default bg-dark-elevated shadow-card";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${surfaceStyles} ${className}`}>
      {children}
    </div>
  );
}
