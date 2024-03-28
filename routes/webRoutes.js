const express = require("express");
const router = express.Router();


const { requireLogin } = require("../middlewares/auth");
const { 
    renderHome,
    renderProfile,
    renderActivities,
    renderSettings,

} = require("../controllers/webController");


router.get("/home", requireLogin, renderHome);
router.get("/profile", requireLogin, renderProfile);
router.get("/activities", requireLogin, renderActivities);
router.get("/settings", requireLogin, renderSettings);

module.exports = router;