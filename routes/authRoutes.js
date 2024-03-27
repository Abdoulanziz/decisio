const express = require("express");
const router = express.Router();

const { 
  renderSignup,
  handleSignup,

  renderSignin,
  handleSignin,

  renderPasswordResetRequest,
  handlePasswordResetRequest,

  renderPasswordReset,
  handlePasswordReset,

} = require("../controllers/authController");

router.get("/signup", renderSignup);
router.get("/signin", renderSignin);
router.get("/password/reset-request", renderPasswordResetRequest);
router.get("/password/reset", renderPasswordReset);

module.exports = router;
