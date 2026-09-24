import { Suspense } from "react";
import MyPlanView from "@/components/MyPlanView";
import Spinner from "@/components/Spinner";

export default function MyPlanPage() {
  return (
    <Suspense fallback={<Spinner label="Loading workouts…" />}>
      <MyPlanView />
    </Suspense>
  );
}