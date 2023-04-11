const express = require("express");
const router = express.Router();

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { notices: ctrl } = require("../../controllers");
const { noticeJoiSchema } = require("../../models/notice");

router.get("/:category", ctrlWrapper(ctrl.getNoticesByCategory));
router.get("/", ctrlWrapper(ctrl.getAllNotices));
// router.post(
//   "/",
//   auth,
//   validation(noticeJoiSchema),
//   ctrlWrapper(ctrl.addNotice)
// );

module.exports = router;
