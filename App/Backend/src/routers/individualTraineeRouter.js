const router = require("express").Router();

const {
  forgetPassword,
  verifyCode,
} = require("../controllers/IndividualTraineeController");
router.post("/forgotpassword", forgetPassword);
router.post("/verifyCode", verifyCode);

module.exports = router;
