const express = require("express");

const router = express.Router();
const { userController } = require("../controller/users");
const { validate } = require("../helpers/users");
const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth");

router.post("/register", validate, userController.insertUsers);
router.post("/login", userController.login);
router.post("/verif", userController.otp);
router.get("/detail-user", protect, userController.getDetailUser);
router.get("/get-user", userController.getUser);
router.put(
  "/update-user",
  protect,
  upload.single("photo"),
  userController.updateUser
);
router.put("/change-password/:id_user", protect, userController.changePassword);
// router.put("/forgot-password", protect, userController.forgotPassword);

module.exports = router;
