const express = require("express");
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", authMiddleware, checkRole(["admin", "manager"]), getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteUser);

module.exports = router;