const User = require("./user");
const Service = require("./service");
const News = require("./new");
const { Notice, noticeJoiSchema } = require('./notice');
const { Pet } = require("./pet");

module.exports = {
  User,
  Service,
  News,
  Notice,
  noticeJoiSchema,
  Pet,
};
