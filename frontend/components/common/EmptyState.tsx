interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <p className="text-[var(--muted)] text-base mb-4">{message}</p>
      {action}
    </div>
  );
}
