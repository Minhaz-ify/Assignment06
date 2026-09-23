import Link from "next/link";
import { Check, Plus, X } from "lucide-react";
import StatsRow from "./StatsRow";

export default function PlanItem({ workout, tab, isDone, onDone, onAddToPlan, onRemove, planFull }) {
  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl border bg-panel p-4 sm:flex-row sm:items-center ${
        isDone ? "border-accent/60" : "border-line"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={workout.image}
        alt={workout.name}
        loading="lazy"
        className="h-40 w-full rounded-xl object-cover sm:h-20 sm:w-28 sm:shrink-0"
      />

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-xl font-semibold uppercase ${
            isDone ? "text-muted line-through" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="mb-2 text-sm text-muted">{workout.equipment}</p>
        <StatsRow workout={workout} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-muted/60 px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        {tab === "plan" ? (
          <button
            onClick={onDone}
            disabled={isDone}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink disabled:cursor-default disabled:opacity-60"
          >
            <Check size={16} aria-hidden="true" />
            {isDone ? "Done" : "Mark as Done"}
          </button>
        ) : (
          <button
            onClick={onAddToPlan}
            disabled={planFull}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} aria-hidden="true" />
            Add to plan
          </button>
        )}

        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:border-red-400 hover:text-red-400"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}
