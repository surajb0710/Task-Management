export function getPendingTime(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due - now; // Difference in milliseconds

  if (diffMs <= 0) {
    return 'Expired';
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} Day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} Hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} Minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${seconds} Second${seconds > 1 ? 's' : ''}`;
  }
}

export function convertISTtoUTC(istTimeString) {
  // Parse the IST timestamp
  const istDate = new Date(istTimeString);

  // Convert to UTC format (ISO string)
  return istDate.toISOString();
}
