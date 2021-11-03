export const cardColor = (completed, overdue) => {
  if (completed) {
    return "bg-green-500";
  } else if (overdue) {
    return "bg-red-500";
  } else {
    return "bg-blue-500";
  }
};
