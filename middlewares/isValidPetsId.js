const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidPetsId = (req, res, next) => {
  const { petsId } = req.params;
  const isValid = isValidObjectId(petsId);
  if (!isValid) {
    next(HttpError(404, `${petsId} is not valid`));
  }
  next();
};

module.exports = isValidPetsId;