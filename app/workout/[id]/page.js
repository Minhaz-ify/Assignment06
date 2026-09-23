"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bookmark, Plus } from "lucide-react";
import { fetchWorkout } from "@/lib/api";
import { PLAN_LIMIT, usePlan } from "@/components/PlanProvider";
import Spinner from "@/components/Spinner";
import TagPills from "@/components/TagPills";
import NotFoundView from "@/components/NotFoundView";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const { plan, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState(undefined); // undefined = loading, null = missing
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setWorkout(undefined);
    setError(null);
    fetchWorkout(id)
      .then((data) => active && setWorkout(data))
      .catch((err) => {
        if (active) {
          setError(err.message);
          setWorkout(null);
        }
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (workout === undefined) return <Spinner label="Loading workout…" />;

  if (workout === null) {
    return (
      <NotFoundView
        title={error ? "Couldn't load workout" : "Workout not found"}
        message={
          error
            ? `${error}. Check your connection and try again.`
            : "We couldn't find that lift. Pick another one from the library."
        }
      />
    );
  }

  const planFull = plan.length >= PLAN_LIMIT && !plan.includes(workout.id);

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to library
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-line bg-raised lg:sticky lg:top-24 lg:self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <TagPills tags={workout.muscleGroups} size="md" />
            <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              {workout.name}
            </h1>
            <p className="text-lg text-muted">{workout.description}</p>
          </div>

          <section aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="mb-3 font-display text-xl font-semibold uppercase">
              Key specs
            </h2>
            <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
              {specs.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between px-5 py-3">
                  <dt className="text-sm uppercase tracking-wider text-muted">{label}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="instructions-heading">
            <h2
              id="instructions-heading"
              className="mb-3 font-display text-xl font-semibold uppercase"
            >
              Instructions
            </h2>
            <ol className="flex flex-col gap-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display font-semibold text-ink">
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)}
              disabled={planFull}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-lg font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <Plus size={20} aria-hidden="true" />
              Add to today&apos;s plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="inline-flex items-center gap-2 rounded-full border border-muted/60 px-6 py-3 font-display text-lg font-semibold uppercase tracking-wide hover:border-accent hover:text-accent"
            >
              <Bookmark size={20} aria-hidden="true" />
              Save for later
            </button>
          </div>
          {planFull && (
            <p className="-mt-4 text-sm text-muted">
              Today&apos;s plan already has {PLAN_LIMIT} lifts. Remove one to add another.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
