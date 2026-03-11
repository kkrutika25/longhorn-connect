export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatDayLabel(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

export function formatTimeRange(start: string, end: string) {
  return `${new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(start))} - ${new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(end))}`;
}

export function formatMeetingType(value: "virtual" | "in_person" | "campus_tour") {
  if (value === "virtual") {
    return "Virtual";
  }

  if (value === "campus_tour") {
    return "Campus Tour";
  }

  return "In-person";
}
