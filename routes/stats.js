const express = require("express");
const { getUserStats, getTeamStats } = require("../controllers/statsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user/:id", authMiddleware, getUserStats);
router.get("/team", authMiddleware, getTeamStats);

module.exports = router;