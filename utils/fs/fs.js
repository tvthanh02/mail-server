const fs = require("fs/promises");
const path = require("path");

const writeFile = async (path, data) => {
  try {
    await fs.writeFile(path, data, {
      encoding: "utf-8",
      flag: "w",
    });
  } catch (error) {
    throw error;
  }
};

const readFile = async (path) => {
  try {
    return await fs.readFile(path, {
      encoding: "utf-8",
      flag: "r",
    });
  } catch (error) {
    throw error;
  }
};

const appendFile = async (path, data) => {
  try {
    await fs.writeFile(path, data, {
      encoding: "utf-8",
      flag: "ax",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  writeFile,
  readFile,
  appendFile,
};
