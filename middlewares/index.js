const auth = require("./auth");
const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const isValidPetsId = require("./isValidPetsId")

module.exports = {
  auth,
  validation,
  ctrlWrapper,
  isValidPetsId
};