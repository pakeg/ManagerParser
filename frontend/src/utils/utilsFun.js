const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

const percentageDifference = (a, b, symbol = "%") => {
  if (a === null || b === null) return "N/A";
  const average = (a + b) / 2;
  const percentageDifference = Math.abs((a - b) / average) * 100;
  return percentageDifference.toFixed(0) + symbol;
};

const formatSize = (length) => {
  var i = 0,
    type = ["b", "kb", "mb", "gb", "tb", "pb"];
  while ((length / 1000) | 0 && i < type.length - 1) {
    length /= 1024;
    i++;
  }
  return length.toFixed(2) + type[i];
};

const sortByProperties = (properties) => {
  return function (a, b) {
    for (var i = 0; i < properties.length; i++) {
      var [property, order] = properties[i].split(":");
      const sortOrder = order === "desc" ? -1 : 1;

      if (a[property] < b[property]) {
        return -1 * sortOrder;
      }
      if (a[property] > b[property]) {
        return 1 * sortOrder;
      }
    }
    return 0;
  };
};

function isValidUrl(url, shopUrl) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#]+\.[^\s]*$/;
  if (!urlPattern.test(url)) {
    return false;
  }
  try {
    const { hostname, pathname, protocol } = new URL(url);
    return !!hostname && !!pathname && !!protocol && hostname == shopUrl;
  } catch (e) {
    return false;
  }
}

export {
  formatDate,
  percentageDifference,
  formatSize,
  sortByProperties,
  isValidUrl,
};
