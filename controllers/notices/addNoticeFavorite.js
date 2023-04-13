const { Notice } = require('../../models');
const { HttpError } = require('../../helpers');

const addNoticeFavorite = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { id } = req.params;

  const { favorite } = await Notice.findOne({ _id: id });

  if (favorite.includes(userId)) {
    throw HttpError(500, 'Notice already added to favorites');
  }

  const notice = await Notice.findOneAndUpdate(
    { _id: id },
    { $push: { favorite: userId } }
  );
 
  res.status(200).json({
    userId: userId,
    noticeId: notice._id,
    message: 'success',
  });
};

module.exports = addNoticeFavorite;
