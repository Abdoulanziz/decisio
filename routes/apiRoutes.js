const express = require("express");
const router = express.Router();

const { requireLogin } = require("../middlewares/auth");

const { 
    checkAPIStatus,
    createUser,
    updateUser,
    fetchUsers,


    createPersonalDetails,
    createPost,
} = require("../controllers/apiController");

router.get("/status", checkAPIStatus);

router.post("/users", createUser);
router.get("/users", fetchUsers);
router.put("/users/:id", updateUser);


router.post("/profile/personal-details", createPersonalDetails);
router.post("/posts", createPost);

module.exports = router;