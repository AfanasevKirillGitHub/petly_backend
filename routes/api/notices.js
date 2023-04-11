const express = require("express");
const router = express.Router();

const { auth, ctrlWrapper } = require("../../middlewares");
const { notices: ctrl } = require("../../controllers");

router.use(auth);

router.get("/own", ctrlWrapper(ctrl.getOwnNotices));

router.delete("/own/:noticeId", ctrlWrapper(ctrl.deleteOwnNoticeById));

module.exports = router;
