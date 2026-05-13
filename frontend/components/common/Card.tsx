import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-4 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
