import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-4
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}
