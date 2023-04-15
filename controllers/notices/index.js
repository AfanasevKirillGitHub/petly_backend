const getNoticesByCategory = require("./getNoticesByCategory");
const getAllNotices = require("./getAllNotices");
const getNoticeById = require("./getNoticeById");
const addNoticeFavorite = require("./addNoticeFavorite");
const addNotice = require("./addNotice");
const getOwnNotices = require("./getOwnNotices");
const deleteOwnNoticeById = require("./deleteOwnNoticeById");
const getFavoriteNotices = require("./getFavoriteNotices");
const removeFavoriteNoticeById = require("./removeFavoriteNoticeById");

module.exports = {
  getNoticesByCategory,
  getAllNotices,
  getNoticeById,
  addNoticeFavorite,
  addNotice,
  getOwnNotices,
  deleteOwnNoticeById,
  getFavoriteNotices,
  removeFavoriteNoticeById,
};
