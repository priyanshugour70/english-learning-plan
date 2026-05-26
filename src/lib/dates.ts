import {
  differenceInCalendarDays,
  format,
  isSameDay,
  isYesterday,
  startOfDay,
} from "date-fns";

export const DAY_MS = 1000 * 60 * 60 * 24;

export function todayKey(d: Date = new Date()) {
  return format(startOfDay(d), "yyyy-MM-dd");
}

export function formatDayLabel(d: Date = new Date()) {
  return format(d, "EEEE, MMM d");
}

export function shortDay(d: Date) {
  return format(d, "EEE");
}

export { differenceInCalendarDays, isSameDay, isYesterday, startOfDay };
