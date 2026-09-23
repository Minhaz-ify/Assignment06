"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchWorkouts } from "./api";

export default function useWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchWorkouts()
      .then((data) => {
        if (active) setWorkouts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (active) setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { workouts, loading, error, retry };
}
