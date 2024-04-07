import fs from "node:fs";

const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

const isValidUrl = (url) => {
  const urlPattern = /^(https):\/\/[^\s/$.?#]+\.[^\s]*$/;
  if (!urlPattern.test(url)) {
    return false;
  }
  try {
    const { hostname, pathname, protocol } = new URL(url);
    return !!hostname && !!pathname && !!protocol;
  } catch (e) {
    return false;
  }
};

export { createFolderIfNotExists, isValidUrl };
