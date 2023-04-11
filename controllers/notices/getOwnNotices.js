const { Notice } = require("../../models");

const getOwnNotices = async (req, res) => {
  const { _id } = req.user;

  const notices = await Notice.find({ owner: _id });

  res.status(200).json(notices);
};

module.exports = getOwnNotices;
