"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "fitlog:v1";
export const PLAN_LIMIT = 5;

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage after mount (keeps server and client markup identical).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.plan)) setPlan(data.plan.slice(0, PLAN_LIMIT));
        if (Array.isArray(data.saved)) setSaved(data.saved);
        if (Array.isArray(data.done)) setDone(data.done);
      }
    } catch {
      /* ignore corrupt or blocked storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, done }));
    } catch {
      /* storage may be unavailable */
    }
  }, [plan, saved, done, hydrated]);

  const addToPlan = useCallback(
    (workout) => {
      if (plan.includes(workout.id)) {
        toast(`${workout.name} is already in today's plan`, { icon: "ℹ️" });
        return;
      }
      if (plan.length >= PLAN_LIMIT) {
        toast.error(`Today's plan is full. Finish a lift to add more.`);
        return;
      }
      setPlan((p) => [...p, workout.id]);
      toast.success("Added to today's plan");
    },
    [plan]
  );

  const addToSaved = useCallback(
    (workout) => {
      if (saved.includes(workout.id)) {
        toast(`${workout.name} is already saved`, { icon: "ℹ️" });
        return;
      }
      setSaved((s) => [...s, workout.id]);
      toast.success("Saved for later");
    },
    [saved]
  );

  const removeFromPlan = useCallback((id) => {
    setPlan((p) => p.filter((x) => x !== id));
    setDone((d) => d.filter((x) => x !== id));
    toast.success("Removed from today's plan");
  }, []);

  const removeFromSaved = useCallback((id) => {
    setSaved((s) => s.filter((x) => x !== id));
    toast.success("Removed from saved");
  }, []);

  const markDone = useCallback(
    (id) => {
      if (done.includes(id)) return;
      setDone((d) => [...d, id]);
      toast.success("Marked as done. Nice work.");
    },
    [done]
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      done,
      hydrated,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    [plan, saved, done, hydrated, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markDone]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
