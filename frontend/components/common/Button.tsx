"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variantStyles = {
  primary: "bg-[var(--accent)] text-white hover:opacity-90",
  secondary: "bg-[var(--accent-soft)] text-[var(--accent)] hover:opacity-80",
  ghost: "bg-transparent text-[var(--muted)] hover:bg-[var(--accent-soft)]",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-base rounded-xl",
  lg: "px-6 py-3 text-lg rounded-2xl",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`
        font-semibold transition-opacity
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
