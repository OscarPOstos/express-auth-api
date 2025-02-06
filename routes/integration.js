const express = require("express");
const { syncJira, syncTrello } = require("../controllers/integrationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/jira/sync", authMiddleware, syncJira);
router.post("/trello/sync", authMiddleware, syncTrello);

module.exports = router;