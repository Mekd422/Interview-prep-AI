const express = require("express");
const {createSessions, getSessionById, getMySessions, deleteSession} = require("../controllers/sessionController");
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();
// Session routes
router.post("/create", protect, createSessionsc);
router.get("/:id", protect, getSessionById);
router.get("/my-sessions", protect, getMySessions);
router.delete("/:id", protect, deleteSession);

module.exports = router;