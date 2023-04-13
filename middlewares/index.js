const auth = require("./auth");
const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const isValidPetsId = require("./isValidPetsId")
const isValidId = require("./isValidId");
const upload = require("./upload");

module.exports = {
  auth,
  validation,
  ctrlWrapper,
  isValidPetsId,
  isValidId,
  upload,
};