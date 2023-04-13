const express = require("express");
const router = express.Router();

const { auth, validation, ctrlWrapper, isValidId, upload } = require("../../middlewares");
const { notices: ctrl } = require("../../controllers");
const { noticeJoiSchema } = require("../../models");

router.get("/:category", ctrlWrapper(ctrl.getNoticesByCategory));
router.get("/", ctrlWrapper(ctrl.getAllNotices));
router.get('/card/:id', isValidId, ctrlWrapper(ctrl.getNoticeById)); // пошук одного повідомлення

router.post('/favorites/:id', isValidId, auth, ctrlWrapper(ctrl.addNoticeFavorite)); // додає оголошення до обраних
router.post('/', auth, upload.single('image'), validation(noticeJoiSchema), ctrlWrapper(ctrl.addNotice)); // створює оголошення 

module.exports = router;
