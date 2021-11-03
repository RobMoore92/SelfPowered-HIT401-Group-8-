import React from "react";
import { isPast, formatDistance, formatDistanceToNow } from "date-fns";

export default (date, completed) => {
  if (completed) {
    return "Completed";
  } else if (isPast(date)) {
    return `${formatDistance(date, new Date())} overdue`;
  } else {
    return formatDistanceToNow(date, { includeSeconds: false });
  }
};
