const BASE = "https://api.abcz.workers.dev/api/fitlog";

let listCache = null;

export function fetchWorkouts() {
  if (!listCache) {
    listCache = fetch(BASE)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .catch((err) => {
        listCache = null; // allow a retry after a failure
        throw err;
      });
  }
  return listCache;
}

export async function fetchWorkout(id) {
  const res = await fetch(`${BASE}/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  // Guard against APIs that answer 200 with an error/empty body.
  if (!data || Array.isArray(data) || !data.id) return null;
  return data;
}
