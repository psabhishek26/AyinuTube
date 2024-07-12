export function getTimeDifference(timestamp) {
  const now = new Date().getTime();
  const uploadedAt = new Date(timestamp).getTime();
  const difference = now - uploadedAt;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}hr ago`;
  } else if (minutes > 0) {
    return `${minutes}min ago`;
  } else {
    return `${seconds}sec ago`;
  }
}

export function getTitleDesc(title) {
  let result = ["", ""];
  const newlineIndex = title.indexOf("\n");
  if (newlineIndex !== -1) {
    result[0] = title.substring(0, newlineIndex).trim();
    result[1] = title.substring(newlineIndex + 1).trim();
  } else {
    result[0] = title.trim();
  }
  return result;
}

export const limitedTitle = (text, wordLimit) => {
  const title = getTitleDesc(text)[0];
  const words = title.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return title;
};
