const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

const percentageDifference = (a, b) => {
  const average = (a + b) / 2;
  const percentageDifference = Math.abs((a - b) / average) * 100;
  return percentageDifference.toFixed(0);
};

const formatSize = (length) => {
  var i = 0,
    type = ['b', 'kb', 'mb', 'gb', 'tb', 'pb'];
  while ((length / 1000) | 0 && i < type.length - 1) {
    length /= 1024;
    i++;
  }
  return length.toFixed(2) + type[i];
};

export { formatDate, percentageDifference, formatSize };
