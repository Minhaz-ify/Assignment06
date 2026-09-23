"use client";

import { useEffect } from "react";
import Link from "next/link";

// Next.js shows this file whenever something crashes while a page is rendering.
// It keeps the navbar and footer on screen and gives the visitor a way out.
export default function RouteError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-bold text-accent sm:text-8xl">Oops</p>
      <h1 className="mt-4 font-display text-3xl font-semibold uppercase">Something went wrong</h1>
      <p className="mt-3 text-muted">
        An unexpected error stopped this page from loading. Try again, or head back to the
        library.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-accent px-6 py-3 font-display text-lg font-semibold uppercase tracking-wide text-ink"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-muted/60 px-6 py-3 font-display text-lg font-semibold uppercase tracking-wide hover:border-accent hover:text-accent"
        >
          Go to workouts
        </Link>
      </div>
    </div>
  );
}
