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

  handleSignout,

} = require("../controllers/authController");

router.get("/signup", renderSignup);
router.post("/signup", handleSignup);
router.get("/signin", renderSignin);
router.post("/signin", handleSignin);
router.get("/password/reset-request", renderPasswordResetRequest);
router.get("/password/reset", renderPasswordReset);
router.get("/signout", handleSignout);

module.exports = router;
