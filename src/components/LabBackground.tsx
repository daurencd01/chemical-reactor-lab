export default function LabBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* soft pastel glow blobs */}
      <div className="absolute -left-16 top-10 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="absolute left-1/3 bottom-0 w-96 h-96 rounded-full bg-orange-100/50 blur-3xl" />
      <div className="absolute right-1/4 bottom-10 w-64 h-64 rounded-full bg-teal-100/50 blur-3xl" />

      {/* floating molecule dots */}
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-blue-300/50 animate-pulse"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            animationDuration: `${2.5 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}
