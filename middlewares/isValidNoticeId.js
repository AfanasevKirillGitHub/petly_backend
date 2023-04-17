const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidNoticeId = (req, res, next) => {
  const { noticeId } = req.params;
  const isValid = isValidObjectId(noticeId);
  if (!isValid) {
    next(HttpError(404, `${noticeId} is not valid`));
  }
  next();
};

module.exports = isValidNoticeId;