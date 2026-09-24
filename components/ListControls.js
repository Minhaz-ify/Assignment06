"use client";

import { ChevronDown, Search } from "lucide-react";

export const SORTS = [
  { value: "duration", label: "Duration", key: "duration" },
  { value: "calories", label: "Calories", key: "caloriesBurned" },
  { value: "rating", label: "Rating", key: "rating" },
];

export default function ListControls({ query, onQueryChange, sortBy, onSortChange }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="relative">
        <span className="sr-only">Search workouts</span>
        <Search
          size={16}
          aria-hidden="true"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-accent"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search name or muscle"
          className="rounded-full border border-line bg-panel py-2 pl-9 pr-4 text-sm text-white placeholder:text-muted hover:border-accent"
        />
      </label>

      <label className="flex items-center gap-3 text-sm text-muted">
        Sort By
        <span className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
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
  );
}