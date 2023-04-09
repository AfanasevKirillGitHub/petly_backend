const express = require("express");
const router = express.Router();

const { auth, ctrlWrapper, isValidNoticeId } = require("../../middlewares");
const { notices: ctrl } = require("../../controllers");

router.get('/favorite', auth, ctrlWrapper(ctrl.getFavoriteNotices));
router.delete('/favorite/:noticeId', auth, isValidNoticeId, ctrlWrapper(ctrl.removeFavoriteNotice));

module.exports = router;