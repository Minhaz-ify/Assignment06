"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
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

  const sorted = useMemo(() => {
    const key = SORTS.find((s) => s.value === sortBy).key;
    return [...workouts].sort((a, b) => b[key] - a[key] || a.id - b.id);
  }, [workouts, sortBy]);

  return (
    <section id="library" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase">The Library</h2>
          <p className="mt-2 text-muted">Twelve lifts covering every major muscle group.</p>
        </div>

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
