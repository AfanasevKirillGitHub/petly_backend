const { HttpError } = require("../../helpers");
const { Notice } = require("../../models");

const deleteOwnNoticeById = async (req, res, next) => {
  const { noticeId } = req.params;
  const { _id } = req.user;

  const ownNotices = await Notice.find({ owner: _id });

  if (!ownNotices) {
    return next(HttpError(404));
  }

  const ownNoticesId = ownNotices.map(({ _id }) => _id.toString());

  if (!ownNoticesId.includes(noticeId)) {
    return next(HttpError(404));
  }

  await Notice.findByIdAndDelete(noticeId);

  res.sendStatus(204);
};

module.exports = deleteOwnNoticeById;
