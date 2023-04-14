const getNoticesByCategory = require("./getNoticesByCategory");
const getAllNotices = require("./getAllNotices");
const getNoticeById = require("./getNoticeById");
const addNoticeFavorite = require("./addNoticeFavorite");
const addNotice = require("./addNotice");
const getFavoriteNotices = require("./getFavoriteNotices");
const removeFavoriteNotice = require("./removeFavoriteNotice");
// const addNotice = require("./addNotice.example");
const getOwnNotices = require("./getOwnNotices");
const deleteOwnNoticeById = require("./deleteOwnNoticeById");

module.exports = {
  getNoticesByCategory,
  getAllNotices,
  getNoticeById,
  addNoticeFavorite,
  addNotice,
  getFavoriteNotices,
  removeFavoriteNotice,
  // addNotice,
  getOwnNotices,
  deleteOwnNoticeById,
};
