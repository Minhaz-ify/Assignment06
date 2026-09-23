export default function Spinner({ label = "Loading workouts…" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-20 text-muted"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="font-display text-lg tracking-wide">{label}</p>
    </div>
  );
}
