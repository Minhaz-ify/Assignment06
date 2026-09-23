import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({ workout }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <li className="flex items-center gap-1.5">
        <Clock size={15} aria-hidden="true" className="text-accent" />
        <span>{workout.duration} min</span>
      </li>
      <li className="flex items-center gap-1.5">
        <Flame size={15} aria-hidden="true" className="text-accent" />
        <span>{workout.caloriesBurned} kcal</span>
      </li>
      <li className="flex items-center gap-1.5">
        <Star size={15} aria-hidden="true" className="fill-accent text-accent" />
        <span>{workout.rating}</span>
      </li>
    </ul>
  );
}
