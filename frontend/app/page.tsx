export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-[var(--accent)]">Life Alchemy</h1>
        <p className="text-[var(--muted)] text-lg">人生炼金术</p>
        <p className="text-[var(--text)] max-w-md">
          把记录变成收集，把努力变成宝石，把过去的美好变成未来的能量。
        </p>
      </div>
    </main>
  );
}
