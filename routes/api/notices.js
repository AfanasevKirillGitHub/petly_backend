const express = require("express");
const router = express.Router();

const {
  auth,
  validation,
  ctrlWrapper,
  isValidId,
  isValidNoticeId,
  upload,
  translate,
} = require("../../middlewares");
const { notices: ctrl } = require("../../controllers");
const { noticeJoiSchema } = require("../../models");

router.get("/:category", ctrlWrapper(ctrl.getNoticesByCategory));
router.get("/", ctrlWrapper(ctrl.getAllNotices));
router.get("/card/:id", isValidId, ctrlWrapper(ctrl.getNoticeById)); // пошук одного повідомлення

router.post(
  "/favorites/:id",
  isValidId,
  auth,
  ctrlWrapper(ctrl.addNoticeFavorite)
); // додає оголошення до обраних
router.post(
  "/",
  auth,
  upload.single("image"),
  translate,
  validation(noticeJoiSchema),
  ctrlWrapper(ctrl.addNotice)
); // створює оголошення
router.use(auth);

router.get("/own", ctrlWrapper(ctrl.getOwnNotices));
router.delete("/own/:noticeId", ctrlWrapper(ctrl.deleteOwnNoticeById));

router.get('/favorite', ctrlWrapper(ctrl.getFavoriteNotices)); // отримує всі оголошення з обраних
router.delete('/favorite/:noticeId', isValidNoticeId, ctrlWrapper(ctrl.removeFavoriteNotice)); // видаляє оголошення з обраних

module.exports = router;
