const getNoticesByCategory = require("./getNoticesByCategory");
const getAllNotices = require("./getAllNotices");
const getNoticeById = require("./getNoticeById");
const addNoticeFavorite = require("./addNoticeFavorite");
const addNotice = require("./addNotice");
// const addNotice = require("./addNotice.example");
const getOwnNotices = require("./getOwnNotices");
const deleteOwnNoticeById = require("./deleteOwnNoticeById");

module.exports = {
  getNoticesByCategory,
  getAllNotices,
  getNoticeById,
  addNoticeFavorite,
  addNotice,
  // addNotice,
  getOwnNotices,
  deleteOwnNoticeById,
};
