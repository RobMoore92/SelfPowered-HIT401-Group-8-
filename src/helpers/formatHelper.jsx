import { format, formatDistance, formatDistanceToNow, isPast } from "date-fns";

export const formatDateTime = (date) => format(date, "dd/MM/yyyy HH:mm:ss");

export const formatTimer = (date, completed) => {
  if (completed) {
    return "Completed";
  } else if (isPast(date)) {
    return `${formatDistance(date, new Date())} overdue`;
  } else {
    return formatDistanceToNow(date, { includeSeconds: false });
  }
};
