"use client";

import { useState } from "react";
import Link from "next/link";
import useWorkouts from "@/lib/useWorkouts";
import { PLAN_LIMIT, usePlan } from "@/components/PlanProvider";
import PlanItem from "@/components/PlanItem";
import Spinner from "@/components/Spinner";

export default function MyPlanPage() {
  const { workouts, loading, error, retry } = useWorkouts();
  const { plan, saved, done, hydrated, addToPlan, removeFromPlan, removeFromSaved, markDone } =
    usePlan();
  const [tab, setTab] = useState("plan");

  const byId = new Map(workouts.map((w) => [w.id, w]));
  const planItems = plan.map((id) => byId.get(id)).filter(Boolean);
  const savedItems = saved.map((id) => byId.get(id)).filter(Boolean);
  const items = tab === "plan" ? planItems : savedItems;

  const totals = {
    exercises: planItems.length,
    minutes: planItems.reduce((sum, w) => sum + w.duration, 0),
    calories: planItems.reduce((sum, w) => sum + w.caloriesBurned, 0),
  };

  const metrics = [
    ["Exercises", totals.exercises],
    ["Minutes", totals.minutes],
    ["Calories", totals.calories],
  ];

  const tabs = [
    ["plan", "Today's Plan"],
    ["saved", "Saved"],
  ];

  const ready = hydrated && !loading;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-5xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
            <p className="text-xs uppercase tracking-wider text-muted sm:text-sm">{label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-accent sm:text-4xl">{value}</p>
          </div>
        ))}
      </div>

      <div role="tablist" aria-label="Plan lists" className="mt-8 flex gap-2 border-b border-line">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`-mb-px border-b-2 px-4 py-3 font-display text-lg font-semibold uppercase tracking-wide transition-colors ${
              tab === key
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {!ready && !error && <Spinner label="Loading workouts…" />}

        {hydrated && error && (
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

        {ready && !error && items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
            <h2 className="font-display text-3xl font-semibold uppercase">Nothing here yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-display text-lg font-semibold uppercase tracking-wide text-ink"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {ready && !error && items.length > 0 && (
          <ul className="flex flex-col gap-4">
            {items.map((w) => (
              <PlanItem
                key={w.id}
                workout={w}
                tab={tab}
                isDone={done.includes(w.id)}
                planFull={plan.length >= PLAN_LIMIT}
                onDone={() => markDone(w.id)}
                onAddToPlan={() => addToPlan(w)}
                onRemove={() => (tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id))}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
