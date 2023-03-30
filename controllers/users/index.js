const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const update = require("./update");
const refreshToken = require("./refreshToken");
const getUserInfo = require("./getUserInfo");

module.exports = {
  register,
  login,
  logout,
  update,
  refreshToken,
  getUserInfo,
};
