const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const {
  auth,
  validation,
  ctrlWrapper,
  passport,
} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

route.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  ctrlWrapper(ctrl.googleAuth)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/update", auth, ctrlWrapper(ctrl.update));

router.post("/jwtrefresh", auth, ctrlWrapper(ctrl.refreshToken));

router.get("/current", auth, ctrlWrapper(ctrl.getUserInfo));

module.exports = router;
