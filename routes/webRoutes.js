const express = require("express");
const router = express.Router();


const { requireLogin } = require("../middlewares/auth");
const { 
    renderHome,
    renderProfile,
    renderActivities,
    renderSettings,

} = require("../controllers/webController");


router.get("/home", renderHome);
router.get("/profile", renderProfile);
router.get("/activities", renderActivities);
router.get("/settings", renderSettings);

module.exports = router;