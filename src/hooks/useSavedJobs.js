import { useCallback, useEffect, useMemo, useState } from "react";

const KEY = "savedJobs";

function readSaved() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function useSavedJobs() {
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    setSavedIds(readSaved());
  }, []);

  const save = useCallback((id) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((id) => {
    setSavedIds((prev) => {
      const next = prev.filter((x) => x !== id);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggle = useCallback(
    (id) => {
      setSavedIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
        localStorage.setItem(KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const isSaved = useCallback((id) => savedIds.includes(id), [savedIds]);

  return useMemo(
    () => ({
      savedIds,
      savedCount: savedIds.length,
      save,
      remove,
      toggle,
      isSaved,
    }),
    [savedIds, save, remove, toggle, isSaved]
  );
}
