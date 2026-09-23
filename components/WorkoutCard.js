import Link from "next/link";
import StatsRow from "./StatsRow";
import TagPills from "./TagPills";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors hover:border-accent"
    >
      <div className="aspect-[4/3] overflow-hidden bg-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <TagPills tags={workout.muscleGroups} />
        <h3 className="font-display text-2xl font-semibold uppercase leading-tight">
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-auto border-t border-line pt-3">
          <StatsRow workout={workout} />
        </div>
      </div>
    </Link>
  );
}
