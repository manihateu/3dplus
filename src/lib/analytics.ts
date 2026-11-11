export const YM_COUNTER_ID = 34268580;

type YmFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    ym?: YmFunction;
  }
}

/**
 * Цели Яндекс.Метрики. Вызываются только после согласия на cookie —
 * до этого счётчик не загружается.
 */
export function trackGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.ym?.(YM_COUNTER_ID, "reachGoal", goal, params);
}
