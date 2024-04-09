export const pad = (string) => {
  return ("0" + string).slice(-2);
};
export const format = (seconds) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export const countPassingScore = (total, percentage) => {
  return Math.floor((parseInt(total) * parseInt(percentage)) / 100);
};
