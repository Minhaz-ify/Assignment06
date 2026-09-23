"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import useWorkouts from "@/lib/useWorkouts";
import WorkoutCard from "./WorkoutCard";
import Spinner from "./Spinner";

const SORTS = [
  { value: "duration", label: "Duration", key: "duration" },
  { value: "calories", label: "Calories", key: "caloriesBurned" },
  { value: "rating", label: "Rating", key: "rating" },
];

export default function Library() {
  const { workouts, loading, error, retry } = useWorkouts();
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  const searchTerm = query.trim().toLowerCase();

  // Filter by name or muscle-group tag first, then sort what is left.
  const visible = useMemo(() => {
    const key = SORTS.find((s) => s.value === sortBy).key;
    return workouts
      .filter(
        (w) =>
          !searchTerm ||
          w.name.toLowerCase().includes(searchTerm) ||
          w.muscleGroups.some((tag) => tag.toLowerCase().includes(searchTerm))
      )
      .sort((a, b) => b[key] - a[key] || a.id - b.id);
  }, [workouts, sortBy, searchTerm]);

  return (
    <section id="library" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase">The Library</h2>
          <p className="mt-2 text-muted">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="relative block">
            <span className="sr-only">Search workouts by name or muscle group</span>
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or muscle"
              className="w-56 rounded-full border border-line bg-panel py-2 pl-10 pr-4 text-sm text-white placeholder:text-muted hover:border-accent"
            />
          </label>

          <label className="flex items-center gap-3 text-sm text-muted">
            Sort By
            <span className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer appearance-none rounded-full border border-line bg-panel py-2 pl-4 pr-10 font-medium text-white hover:border-accent"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-accent"
              />
            </span>
          </label>
        </div>
      </div>

      {loading && <Spinner />}

      {!loading && error && (
        <div className="rounded-2xl border border-line bg-panel p-8 text-center">
          <p className="font-display text-2xl uppercase">Couldn&apos;t load workouts</p>
          <p className="mt-2 text-muted">{error}. Check your connection and try again.</p>
          <button
            onClick={retry}
            className="mt-5 rounded-full bg-accent px-5 py-2 font-semibold text-ink"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <p className="sr-only" aria-live="polite">
          {visible.length} lifts shown
        </p>
      )}

      {!loading && !error && visible.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}

      {!loading && !error && visible.length === 0 && searchTerm && (
        <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <h3 className="font-display text-3xl font-semibold uppercase">No lifts found</h3>
          <p className="mx-auto mt-2 max-w-sm text-muted">
            Nothing matches &ldquo;{query.trim()}&rdquo;. Try a lift name or a muscle group like
            chest or core.
          </p>
          <button
            onClick={() => setQuery("")}
            className="mt-6 rounded-full bg-accent px-6 py-2 font-display text-lg font-semibold uppercase tracking-wide text-ink"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
