export type HistoryKind = "email" | "notes" | "planner" | "research" | "chat";

export interface HistoryItem {
  id: string;
  kind: HistoryKind;
  title: string;
  preview: string;
  content: string;
  favorite?: boolean;
  createdAt: number;
}

const KEY = "wp-history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("wp-history-change"));
}

export function addHistory(item: Omit<HistoryItem, "id" | "createdAt">) {
  const items = getHistory();
  const next: HistoryItem = { ...item, id: crypto.randomUUID(), createdAt: Date.now() };
  saveHistory([next, ...items].slice(0, 200));
  return next;
}

export function toggleFavorite(id: string) {
  saveHistory(getHistory().map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i)));
}

export function deleteHistory(id: string) {
  saveHistory(getHistory().filter((i) => i.id !== id));
}

export function clearHistory() {
  saveHistory([]);
}