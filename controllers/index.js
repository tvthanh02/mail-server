const { readFile, writeFile } = require("../utils/fs/fs");
const path = "confirm_email.json";

const handleConfirmEmail = async (code) => {
  const data = await readFile(path);
  const updateData = JSON.parse(data);
  updateData.confirm.push(code);
  await writeFile(path, JSON.stringify(updateData));
};

const getStatusConfirm = async (code) => {
  const data = await readFile(path);
  const dataParse = JSON.parse(data);
  return dataParse.confirm.find((item) => item === code);
};

module.exports = {
  handleConfirmEmail,
  getStatusConfirm,
};
