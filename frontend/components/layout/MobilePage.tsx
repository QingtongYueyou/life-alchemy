import { ReactNode } from "react";

interface MobilePageProps {
  children: ReactNode;
  className?: string;
}

export function MobilePage({ children, className = "" }: MobilePageProps) {
  return (
    <div
      className={`
        min-h-screen max-w-[480px] mx-auto
        bg-[var(--bg)] relative
        ${className}
      `}
    >
      {children}
    </div>
  );
}
