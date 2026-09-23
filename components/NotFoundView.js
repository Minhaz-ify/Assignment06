import Link from "next/link";

export default function NotFoundView({
  title = "404 — Page not found",
  message = "That page doesn't exist or has moved. Head back to the library to pick a lift.",
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold uppercase">{title}</h1>
      <p className="mt-3 text-muted">{message}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 font-display text-lg font-semibold uppercase tracking-wide text-ink"
      >
        Go to workouts
      </Link>
    </div>
  );
}
