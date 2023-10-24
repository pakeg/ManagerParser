const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

const percentageDifference = (a, b) => {
  const average = (a + b) / 2;
  const percentageDifference = Math.abs((a - b) / average) * 100;
  return percentageDifference.toFixed(0);
};

export { formatDate, percentageDifference };
